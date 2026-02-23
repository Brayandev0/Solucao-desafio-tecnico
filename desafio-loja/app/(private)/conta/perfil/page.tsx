import type { Metadata } from "next";
import { getMetaData } from "@/lib/metadata";
import PerfilConteudo from "@/components/pedidos/perfil-header";
import PedidosConteudo from "@/components/pedidos/profile-content";
import { api } from "@/services";
import { BuscarPerfil } from "@/services/Usuario";

export async function generateMetadata(): Promise<Metadata> {
  return getMetaData({
    title: "Perfil - LOJA",
    description: "Gerencie seus dados pessoais e configuracoes da conta.",
    image: "",
    url: "/conta/perfil",
  });
}

export default async function Page() {
  const pedidos = await BuscarPerfil();

  
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-10">
      <PerfilConteudo userInfo={pedidos.userInfo} />
      <PedidosConteudo userData={pedidos.userInfo} />
    </div>
  );
}