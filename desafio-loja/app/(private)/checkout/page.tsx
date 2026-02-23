import type { Metadata } from "next";
import { getMetaData } from "@/lib/metadata";
import { CheckoutConteudo } from "@/components/checkout/checkout-conteudo";

export async function generateMetadata(): Promise<Metadata> {
  return getMetaData({
    title: "Checkout - LOJA",
    description: "Finalize sua compra de forma segura e rapida.",
    image: "",
    url: "/checkout",
  });
}

export default async function CheckoutPage() {
  return <CheckoutConteudo />;
}
