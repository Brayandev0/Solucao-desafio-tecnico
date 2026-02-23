"use client";
import { CardProduto } from "@/components/produto/card-produto";
import type { Produto } from "@/types";

interface ProdutosMaisVendidosProps {
  produtos: Produto[];
}

export function ProdutosMaisVendidos({ produtos }: ProdutosMaisVendidosProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 lg:px-8 lg:py-24">
      <div className="mb-10 flex flex-col items-start gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Curadoria
          </span>
          <h2 className="mt-1 font-serif text-3xl font-bold text-foreground">
            Mais vendidos
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {produtos.map((produto) => (
          <CardProduto key={produto.id} produto={produto} />
        ))}
      </div>
    </section>
  );
}
