import Image from "next/image";
import { ArrowRight, Minus, Plus, Trash2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatarMoeda } from "@/lib/formatador"
import { ItemCarrinho } from "../types";

interface StepCarrinhoProps {
  itens: ItemCarrinho[];
  totalValor: number;
  onAtualizarQuantidade: (id: number, quantidade: number) => void;
  onRemoverItem: (id: number) => void;
  onAvancar: () => void;
}

export function StepCarrinho({
  itens,
  totalValor,
  onAtualizarQuantidade,
  onRemoverItem,
  onAvancar,
}: StepCarrinhoProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          Itens no carrinho ({itens.length})
        </h2>
      </div>

      <div className="flex flex-col divide-y divide-border">
        {itens.map((item) => (
          <div
            key={item.produto.id}
            className="flex gap-4 py-5 first:pt-0 last:pb-0"
          >
            <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
              <Image
                src={item.produto.imagem}
                alt={item.produto.nome}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h4 className="text-sm font-semibold text-foreground">
                  {item.produto.nome}
                </h4>
                {item.produto.categoria && (
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    {item.produto.categoria}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-full border border-border">
                  <button
                    className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => onAtualizarQuantidade(item.produto.id, item.quantidade - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm font-medium text-foreground">
                    {item.quantidade}
                  </span>
                  <button
                    className="flex h-8 w-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                    onClick={() => onAtualizarQuantidade(item.produto.id, item.quantidade + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                </div>
                <button
                  className="text-muted-foreground transition-colors hover:text-destructive"
                  onClick={() => onRemoverItem(item.produto.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end justify-between">
              <span className="text-sm font-bold text-foreground">
                {formatarMoeda(item.produto.preco * item.quantidade)}
              </span>
              {item.quantidade > 1 && (
                <span className="text-xs text-muted-foreground">
                  {formatarMoeda(item.produto.preco)} cada
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalValor < 299 && (
        <div className="flex items-center gap-2 rounded-xl bg-secondary px-4 py-3">
          <Truck className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Faltam{" "}
            <span className="font-semibold text-foreground">
              {formatarMoeda(299 - totalValor)}
            </span>{" "}
            para frete gratis.
          </p>
        </div>
      )}

      <Button size="lg" className="w-full gap-2 text-base" onClick={onAvancar}>
        Continuar para entrega
        <ArrowRight className="h-4 w-4" />
      </Button>
    </div>
  );
}