"use server";
import { cookies } from "next/headers";

export async function buscarCookies(nome: string | "AuthToken") {
  try {
    const allCookies = await cookies();
    const cookie = allCookies.get(nome);

    return cookie ? cookie.value : null;
  } catch (error) {
    console.error("Erro ao buscar cookie:", error);
  }
}

export async function salvarCookies(
  nome: string,
  valor: string,
  options: { path?: string; maxAge?: number, httpOnly?: boolean } = {},
) {
  try {
    const cookieOptions = {
      ...options,
      name: nome,
      value: valor,
    };
    const allCookies = await cookies();
    allCookies.set(cookieOptions);
  } catch (error) {
    console.error("Erro ao salvar cookie:", error);
  }
}
