import type { Metadata } from "next";
import { getMetaData } from "@/lib/metadata";
import { HeroBanner } from "@/components/home/hero-banner";
import { ProdutosMaisVendidos } from "@/components/home/produtos-mais-vendidos";
import { ProdutosGrid } from "@/components/home/produtos-recentes";
import { Produtos } from "@/services/Produtos";

export async function generateMetadata(): Promise<Metadata> {
  return getMetaData({
    title: "LOJA - Design e Elegancia",
    description:
      "Descubra produtos de design, decoracao e moveis de alta qualidade com curadoria especial.",
    image: "",
    url: "/",
  });
}

export default async function Home() {
  const [todosOsProdutos, destaques, recentes] = await Promise.all([
    Produtos.buscarTodosProdutos(35, undefined, undefined, 4),
    Produtos.buscarTodosProdutos(1, "desc", "price", 0),
    Produtos.buscarTodosProdutos(4, undefined, undefined, 0),
  ]);

  return (
    <>
      <HeroBanner produto={destaques[0]} />
      <ProdutosMaisVendidos produtos={recentes} />
      <ProdutosGrid produtos={todosOsProdutos} />
    </>
  );
}
