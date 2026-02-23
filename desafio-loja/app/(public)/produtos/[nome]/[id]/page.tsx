import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMetaData } from "@/lib/metadata";
import { api } from "@/services";
import { ProdutoIdPage } from "@/components/produto/detalhe-produto";
import { gerarSlug } from "@/lib/formatador";
import { Produtos } from "@/services/Produtos";
import { ProdutoAPI } from "@/types";

interface ProdutoPageProps {
  params: Promise<{ nome: string; id: string }>;
}

export async function generateMetadata({
  params,
}: ProdutoPageProps): Promise<Metadata> {
  const { nome, id } = await params;
  const produto = await Produtos.buscarProdutoPorId(Number(id));

  if (!produto) {
    return getMetaData({
      title: "Produto nao encontrado - LOJA",
      description: "O produto que voce procura nao foi encontrado.",
      image: "",
      url: "/produtos",
    });
  }

  const slug = gerarSlug(produto.nome);

  return getMetaData({
    title: `${produto.nome} - LOJA`,
    description: produto.descricao,
    image: produto.thumbnail,
    url: `/produtos/${slug}/${produto.id}`,
  });
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const { id } = await params;
  const produto = await Produtos.buscarProdutoPorId(Number(id));

  if (!produto) {
    notFound();
  }

  return <ProdutoIdPage produto={produto} />;
}
