import type { Metadata } from "next";
import { getMetaData } from "@/lib/metadata";
import { RegistroForm } from "@/components/auth/registro-form";

export async function generateMetadata(): Promise<Metadata> {
  return getMetaData({
    title: "Registro - LOJA",
    description:
      "Crie sua conta para aproveitar ofertas exclusivas e acompanhar seus pedidos.",
    image: "",
    url: "/registro",
  });
}

export default async function RegistroPage() {
  return <RegistroForm />;
}
