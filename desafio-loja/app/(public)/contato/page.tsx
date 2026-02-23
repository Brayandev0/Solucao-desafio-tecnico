import type { Metadata } from "next";
import { getMetaData } from "@/lib/metadata";
import ContatoForm from "@/components/contato/contato-form";

export async function generateMetadata(): Promise<Metadata> {
  return getMetaData({
    title: "Contato - LOJA",
    description: "Entre em contato conosco para duvidas, sugestoes ou suporte.",
    image: "",
    url: "/contato",
  });
}

export default async function ContatoPage() {
  return <ContatoForm />;
}
