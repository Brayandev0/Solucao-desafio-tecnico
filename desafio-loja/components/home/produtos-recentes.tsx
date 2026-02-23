"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ShoppingCart, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCarrinho } from "@/hooks/use-carrinho";
import { gerarSlug } from "@/lib/formatador";
import type { Produto, ProdutoAPI } from "@/types";
import { Produtos } from "@/services/Produtos";
import { de } from "date-fns/locale";
import { CardProduto } from "../produto/card-produto";

function apiParaProdutoLocal(p: Produto) {
  return {
    id: p.id + 10000,
    nome: p.nome,
    slug: gerarSlug(p.nome),
    descricao: p.descricao.slice(0, 80),
    descriaoCompleta: p.descricao,
    preco: p.preco,
    imagem: p.imagem,
    estoque: p.estoque,
    destaque: false,
  };
}

export function ProdutosGrid({ produtos }: { produtos: Produto[] }) {

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Novidades
          </span>
          <h2 className="mt-1 font-serif text-3xl font-bold text-foreground">
            Produtos do momento
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link href="/produtos">
          <Button size="lg" variant="outline" className="gap-2">
            Ver todos os produtos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
