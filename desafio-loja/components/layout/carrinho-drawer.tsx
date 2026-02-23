"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Minus, Plus, ArrowRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "@/hooks/use-carrinho";
import { formatarMoeda } from "@/lib/formatador";

export function CarrinhoDrawer() {
  const {
    itens,
    removerItem,
    atualizarQuantidade,
    totalItens,
    totalValor,
    aberto,
    setAberto,
  } = useCarrinho();

  return (
    <Sheet open={aberto} onOpenChange={setAberto}>
      <SheetContent className="flex w-full flex-col border-l-0 p-0 sm:max-w-[420px]">
        <SheetHeader className="border-b border-border px-6 py-5">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-sm font-medium uppercase tracking-widest text-foreground">
              Carrinho ({totalItens})
            </SheetTitle>
          </div>
        </SheetHeader>

        {itens.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 px-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-foreground"
              >
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" x2="21" y1="6" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">
                Carrinho vazio
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Adicione produtos para continuar
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setAberto(false)}
              className="mt-2 text-xs"
            >
              Continuar comprando
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                {itens.map((item, index) => (
                  <div
                    key={item.produto.id}
                    className={`flex gap-4 px-6 py-5 ${
                      index !== itens.length - 1 ? "border-b border-border" : ""
                    }`}
                  >
                    <div className="relative h-[88px] w-[72px] flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                      <Image
                        src={item.produto.imagem}
                        alt={item.produto.nome}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-medium leading-tight text-foreground">
                            {item.produto.nome}
                          </h4>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {item.produto.categoria}
                          </p>
                        </div>
                        <button
                          onClick={() => removerItem(item.produto.id)}
                          className="flex-shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                          aria-label="Remover item"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center rounded-full border border-border">
                          <button
                            onClick={() =>
                              atualizarQuantidade(
                                item.produto.id,
                                item.quantidade - 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Diminuir quantidade"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-[28px] text-center text-xs font-medium text-foreground">
                            {item.quantidade}
                          </span>
                          <button
                            onClick={() =>
                              atualizarQuantidade(
                                item.produto.id,
                                item.quantidade + 1
                              )
                            }
                            className="flex h-7 w-7 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
                            aria-label="Aumentar quantidade"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold text-foreground">
                          {formatarMoeda(item.produto.preco * item.quantidade)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <SheetFooter className="border-t border-border px-6 py-5">
              <div className="flex w-full flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="text-base font-semibold text-foreground">
                    {formatarMoeda(totalValor)}
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Frete e impostos calculados no checkout
                </p>
                <Link href="/checkout" onClick={() => setAberto(false)}>
                  <Button className="w-full gap-2" size="lg">
                    Finalizar compra
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <button
                  onClick={() => setAberto(false)}
                  className="text-center text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
                >
                  Continuar comprando
                </button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
