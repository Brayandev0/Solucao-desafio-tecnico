import type { Metadata } from "next";
import { getMetaData } from "@/lib/metadata";
import { LoginForm } from "@/components/auth/login-form";

export async function generateMetadata(): Promise<Metadata> {
  return getMetaData({
    title: "Login - LOJA",
    description: "Faca login na sua conta para acessar seus pedidos e perfil.",
    image: "",
    url: "/login",
  });
}

export default async function LoginPage() {
  return <LoginForm />;
}
