"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "@/hooks/use-carrinho";
import { formatarMoeda, gerarSlug } from "@/lib/formatador";
import type { Produto } from "@/types";

interface CardProdutoProps {
  produto: Produto;
}

export function CardProduto({ produto }: CardProdutoProps) {
  const { adicionarItem } = useCarrinho();

  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-lg">
      <Link
        href={`/produtos/${gerarSlug(produto.nome)}/${produto.id}`}
        className="relative aspect-square overflow-hidden bg-muted"
      >
        <Image
          src={produto.imagem}
          alt={produto.nome}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <Link
          href={`/produtos/${gerarSlug(produto.nome)}/${produto.id}`}
          className="line-clamp-2 text-sm font-medium leading-snug text-foreground transition-colors hover:text-muted-foreground"
        >
          {produto.nome}
        </Link>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">
          {produto.descricao}
        </p>
        <div className="mt-auto pt-3">
          <span className="text-lg font-bold text-foreground">
            {produto.preco}
          </span>
          <div className="mt-2.5 flex items-center gap-2">
            <Button
              size="sm"
              className="flex-1 gap-1.5 text-xs"
              onClick={() => adicionarItem(produto)}
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              Comprar
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => adicionarItem(produto)}
              aria-label={`Adicionar ${produto.nome} ao carrinho`}
            >
              <ShoppingCart className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
