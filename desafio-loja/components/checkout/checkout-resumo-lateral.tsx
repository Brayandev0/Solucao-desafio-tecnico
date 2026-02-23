import Image from "next/image";
import { Truck } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { formatarMoeda } from "@/lib/formatador";
import type { ItemCarrinho } from "./types";

interface ResumoLateralProps {
  itens: ItemCarrinho[];
  totalValor: number;
  frete: number;
}

export function ResumoLateral({ itens, totalValor, frete }: ResumoLateralProps) {
  const total = totalValor + frete;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Resumo do pedido
      </h3>

      <div className="mt-4 flex flex-col gap-3">
        {itens.map((item) => (
          <div key={item.produto.id} className="flex items-center gap-3">
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
              <Image
                src={item.produto.imagem}
                alt={item.produto.nome}
                fill
                className="object-cover"
              />
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                {item.quantidade}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-foreground">
                {item.produto.nome}
              </p>
            </div>
            <span className="text-sm font-medium text-foreground">
              {formatarMoeda(item.produto.preco * item.quantidade)}
            </span>
          </div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="flex flex-col gap-2 text-sm">
        <div className="flex justify-between text-muted-foreground">
          <span>Subtotal</span>
          <span>{formatarMoeda(totalValor)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>Frete</span>
          <span>{frete === 0 ? "Gratis" : formatarMoeda(frete)}</span>
        </div>
      </div>

      <Separator className="my-4" />

      <div className="flex items-center justify-between">
        <span className="text-base font-bold text-foreground">Total</span>
        <span className="text-xl font-bold text-foreground">
          {formatarMoeda(total)}
        </span>
      </div>

      {totalValor >= 299 && (
        <div className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
          <Truck className="h-3.5 w-3.5" />
          Frete gratis aplicado
        </div>
      )}
    </div>
  );
}