"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "@/hooks/use-carrinho";
import { formatarMoeda, gerarSlug } from "@/lib/formatador";
import type { Produto } from "@/types";

interface HeroBannerProps {
  produto: Produto;
}

export function HeroBanner({ produto }: HeroBannerProps) {
  const { adicionarItem } = useCarrinho();
  return (
    <section className="relative overflow-hidden bg-muted">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24 lg:px-8">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Destaque
          </span>
          <h1 className="text-balance font-serif text-4xl font-bold leading-tight text-foreground md:text-5xl lg:text-6xl">
            {produto.nome}
          </h1>
          <p className="max-w-md text-pretty leading-relaxed text-muted-foreground">
            {produto.descricao}
          </p>
          <div className="flex items-center gap-4">
            <span className="text-3xl font-bold text-foreground">
               {produto.preco}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="lg"
              onClick={() => adicionarItem(produto)}
              className="gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              Comprar agora
            </Button>
            <Link href={`/produtos/${gerarSlug(produto.nome)}/${produto.id}`}>
              <Button size="lg" variant="outline" className="gap-2">
                Ver detalhes
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
        <div className="relative aspect-square overflow-hidden rounded-2xl">
          <Image
            src={produto.imagem}
            alt={produto.nome}
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
