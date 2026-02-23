"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingBag,
  ShoppingCart,
  ArrowLeft,
  Star,
  Truck,
  Shield,
  RotateCcw,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCarrinho } from "@/hooks/use-carrinho";
import { gerarSlug } from "@/lib/formatador";
import { ImageZoom } from "./zoom-produto";

// ─── Tipo direto do backend ───────────────────────────────────────────────────
export interface ProdutoBackend {
  id: number;
  nome: string;
  descricao: string;
  categoria: string;
  preco: string;             // "R$ 109.94"
  desconto: string;          // "18.19%"
  avaliacaoNota: string;     // "2.86 / 5"
  estoque: number;
  tags: string[];
  marca: string;
  sku: string;
  peso: number;
  dimensoes: {
    width: number;
    height: number;
    depth: number;
  };
  informacaoGarantia: string;
  informacaoEnvio: string;
  statusDisponibilidade: "In Stock" | "Low Stock" | "Out of Stock";
  avaliacoes: {
    nota: number;
    nome: string;
    comentario: string;
    data: string;
    email: string;
  }[];
  politicaRetorno: string;
  quantidadeMinimaPedido: number;
  imagens: string[];
  thumbnail: string;
}

interface DetalheProdutoProps {
  produto: ProdutoBackend;
}

export function ProdutoIdPage({ produto }: DetalheProdutoProps) {
  const { adicionarItem } = useCarrinho();
  const [imagemAtual, setImagemAtual] = useState(0);

  const notaNumerica = parseFloat(produto.avaliacaoNota.split("/")[0].trim());
  const descontoNumerico = parseFloat(produto.desconto.replace("%", "").trim());

  const produtoLocal = {
    id: produto.id,
    nome: produto.nome,
    slug: gerarSlug(produto.nome),
    descricao: produto.descricao.slice(0, 80),
    descricaoCompleta: produto.descricao,
    preco: produto.preco,
    imagem: produto.thumbnail,
    categoria: produto.categoria,
    destaque: false,
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8 lg:py-16">
      <Link
        href="/produtos"
        className="mb-8 border border-gray-400 p-2 rounded-3xl inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para produtos
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:gap-16">
        {/* ── Galeria de imagens ── */}
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <ImageZoom>
              <img
                src={produto.imagens[imagemAtual] || produto.thumbnail}
                className="object-cover"
                loading="eager"
              />
            </ImageZoom>

            {produto.imagens.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setImagemAtual((p) =>
                      p === 0 ? produto.imagens.length - 1 : p - 1
                    )
                  }
                  className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground backdrop-blur-sm transition-colors hover:bg-card"
                  aria-label="Imagem anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() =>
                    setImagemAtual((p) =>
                      p === produto.imagens.length - 1 ? 0 : p + 1
                    )
                  }
                  className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground backdrop-blur-sm transition-colors hover:bg-card"
                  aria-label="Proxima imagem"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}

            {descontoNumerico > 5 && (
              <Badge className="absolute left-3 top-3 bg-primary text-primary-foreground">
                -{Math.round(descontoNumerico)}%
              </Badge>
            )}
          </div>

          {produto.imagens.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {produto.imagens.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImagemAtual(i)}
                  className={`cursor-pointer relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    imagemAtual === i
                      ? "border-foreground"
                      : "border-border opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`${produto.nome} - imagem ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Informações do produto ── */}
        <div className="flex flex-col gap-5">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {produto.categoria}
              </span>
              {produto.marca && (
                <>
                  <span className="text-muted-foreground">{"/"}</span>
                  <span className="text-xs font-medium text-muted-foreground">
                    {produto.marca}
                  </span>
                </>
              )}
            </div>
            <h1 className="mt-2 font-serif text-3xl font-bold text-foreground md:text-4xl">
              {produto.nome}
            </h1>
          </div>

          {/* Avaliação */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(notaNumerica)
                      ? "fill-foreground text-foreground"
                      : "text-border"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium text-foreground">
              {notaNumerica.toFixed(1)}
            </span>
            <span className="text-sm text-muted-foreground">
              ({produto.avaliacoes.length} avaliacoes)
            </span>
          </div>

          <p className="leading-relaxed text-muted-foreground">
            {produto.descricao}
          </p>

          <Separator />

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-foreground">
              {produto.preco}
            </span>
            {descontoNumerico > 5 && (
              <span className="text-xs text-muted-foreground">
                {produto.desconto} de desconto
              </span>
            )}
          </div>

          {/* Disponibilidade */}
          <Badge
            variant={
              produto.statusDisponibilidade === "In Stock"
                ? "secondary"
                : "destructive"
            }
            className="w-fit"
          >
            {produto.statusDisponibilidade === "In Stock"
              ? "Em estoque"
              : produto.statusDisponibilidade === "Low Stock"
                ? "Estoque baixo"
                : "Fora de estoque"}
            {produto.estoque > 0 && ` (${produto.estoque} unidades)`}
          </Badge>

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              className="flex-1 gap-2 md:flex-none"
              onClick={() => adicionarItem(produtoLocal)}
              disabled={produto.statusDisponibilidade === "Out of Stock"}
            >
              <ShoppingBag className="h-4 w-4" />
              Comprar
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2"
              onClick={() => adicionarItem(produtoLocal)}
              disabled={produto.statusDisponibilidade === "Out of Stock"}
            >
              <ShoppingCart className="h-4 w-4" />
              Adicionar ao carrinho
            </Button>
          </div>

          <Separator />

          {/* Grade de detalhes */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
              <Truck className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">Envio</p>
                <p className="text-[11px] text-muted-foreground">
                  {produto.informacaoEnvio}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
              <Shield className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">Garantia</p>
                <p className="text-[11px] text-muted-foreground">
                  {produto.informacaoGarantia}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
              <RotateCcw className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">
                  Devolucao
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {produto.politicaRetorno}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg bg-muted/50 p-3">
              <Package className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
              <div>
                <p className="text-xs font-medium text-foreground">
                  Dimensoes
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {produto.dimensoes.width} x {produto.dimensoes.height} x{" "}
                  {produto.dimensoes.depth} cm
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          {produto.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {produto.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Seção de avaliações ── */}
      {produto.avaliacoes.length > 0 && (
        <div className="mt-16">
          <h2 className="font-serif text-2xl font-bold text-foreground">
            Avaliacoes
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {produto.avaliacoes.map((avaliacao, i) => (
              <div
                key={i}
                className="rounded-xl border border-border bg-card p-5"
              >
                <div className="flex items-center gap-1 mb-3">
                  {Array.from({ length: 5 }, (_, j) => (
                    <Star
                      key={j}
                      className={`h-3.5 w-3.5 ${
                        j < avaliacao.nota
                          ? "fill-foreground text-foreground"
                          : "text-border"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-foreground">
                  {`"${avaliacao.comentario}"`}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted text-xs font-semibold text-foreground">
                    {avaliacao.nome.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-foreground">
                      {avaliacao.nome}
                    </p>
                    <p className="text-[10px] text-muted-foreground">
                      {avaliacao.data}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}