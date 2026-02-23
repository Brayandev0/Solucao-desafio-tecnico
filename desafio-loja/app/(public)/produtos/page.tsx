"use server"
import type { Metadata } from "next";
import { getMetaData } from "@/lib/metadata";
import { api } from "@/services";
import { Categoria, ListaProdutos } from "@/components/produto/lista-produtos";
import { Produtos } from "@/services/Produtos";
import { cacheLife } from "next/cache";

export async function generateMetadata(): Promise<Metadata> {
  return getMetaData({
    title: "Produtos - Ecommerce Virtual",
    description:
      "Explore nossa colecao completa de moveis, decoracao e acessorios de design.",
    image: "",
    url: "/produtos",
  });
}

export default async function ProdutosPage() {
  "use cache";
  cacheLife("hours");
  const [produtosLocais, categorias] = await Promise.all([
    Produtos.buscarTodosProdutos(),
    Produtos.buscarCategoriasProdutos(),
  ]);
  return (
    <ListaProdutos
      produtosIniciais={produtosLocais}
      categorias={categorias}
    />
  );
}
