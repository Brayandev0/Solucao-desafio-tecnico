import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verificarAutenticacao } from "./utils/Auth";

export default async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const logado = await verificarAutenticacao();
  // Buscar o cookie diretamente no middleware
  const cookieName = process.env.Auth_cookie_name || "clientSession";
  const token = request.cookies.get(cookieName)?.value;
  // Rota de login
  if (pathname === "/login" || pathname === "/registro") {
    if (token && logado) {
      return NextResponse.redirect(new URL("/", origin));
    }
    return NextResponse.next();
  }
  if (
    pathname.startsWith("/conta") ||
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/checkout/") ||
    pathname.startsWith("/conta/")
  ) {
    if (!token || !logado) {
      return NextResponse.redirect(new URL("/login", origin));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/registro", "/conta/:path*", "/checkout/:path*"],
};