import type { Metadata } from "next";
import { getMetaData } from "@/lib/metadata";
import ItemsConteudo from "@/components/pedidos/card-items-uuid-content";
import { BuscarPedidoPorUuid } from "@/services/Usuario";
import { notFound } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  return getMetaData({
    title: "Pedidos - LOJA",
    description: "Gerencie seus pedidos.",
    image: "",
    url: "/conta/perfil",
  });
}

export default async function Page({ params }: { params: { uuid: string } }) {
    const {uuid} = await params
    const pedidos = await BuscarPedidoPorUuid(uuid)

    if(!pedidos || pedidos.code !== 200) {
      notFound()
    }
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <ItemsConteudo order={pedidos.pedidos} />
    </div>
  );
}