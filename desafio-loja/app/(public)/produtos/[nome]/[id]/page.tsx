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

  if (!produto || produto.code !== 200) {
    return getMetaData({
      title: "Produto nao encontrado - LOJA",
      description: "O produto que voce procura nao foi encontrado.",
      image: "",
      url: "/produtos",
    });
  }

  const slug = gerarSlug(produto.produto.nome);

  return getMetaData({
    title: `${produto.produto.nome} - LOJA`,
    description: produto.produto.descricao,
    image: produto.produto.thumbnail,
    url: `/produtos/${slug}/${produto.produto.id}`,
  });
}

export default async function ProdutoPage({ params }: ProdutoPageProps) {
  const { id } = await params;
  const produto = await Produtos.buscarProdutoPorId(Number(id));
  console.log("Produto encontrado:", produto);
  if (!produto || produto.code !== 200) {
    notFound();
  }

  return <ProdutoIdPage produto={produto.produto} />;
}
