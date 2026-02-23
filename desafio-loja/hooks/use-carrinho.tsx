"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { Produto, ItemCarrinho } from "@/types";

const COOKIE_KEY = "carrinho_itens";

function parsePrecoBR(preco: string | number): number {
  if (typeof preco === "number") return isNaN(preco) ? 0 : preco;

  const str = String(preco)
    .replace(/R\$\s*/g, "")
    .trim();

  // Se contém vírgula, está no formato BR (ex: "203.499,94")
  if (str.includes(",")) {
    return Number(str.replace(/\./g, "").replace(",", "."));
  }

  // Já está normalizado (ex: "203499.94") — não remove o ponto decimal
  return Number(str);
}

function lerCarrinhoCookie(): ItemCarrinho[] {
  if (typeof document === "undefined") return [];
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_KEY}=`));
    if (!match) return [];
    return JSON.parse(decodeURIComponent(match.split("=")[1]));
  } catch {
    return [];
  }
}

function salvarCarrinhoCookie(itens: ItemCarrinho[]) {
  if (typeof document === "undefined") return;
  const valor = encodeURIComponent(JSON.stringify(itens));
  document.cookie = `${COOKIE_KEY}=${valor};path=/;max-age=604800;SameSite=Lax`;
}

interface CarrinhoContexto {
  itens: ItemCarrinho[];
  adicionarItem: (produto: Produto) => void;
  removerItem: (produtoId: number) => void;
  atualizarQuantidade: (produtoId: number, quantidade: number) => void;
  limparCarrinho: () => void;
  totalItens: number;
  totalValor: number;
  aberto: boolean;
  setAberto: (v: boolean) => void;
}

const CarrinhoContext = createContext<CarrinhoContexto | null>(null);

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [aberto, setAberto] = useState(false);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setItens(lerCarrinhoCookie());
    setMontado(true);
  }, []);

  useEffect(() => {
    if (montado) {
      salvarCarrinhoCookie(itens);
    }
  }, [itens, montado]);

  const adicionarItem = useCallback((produto: Produto) => {
    // Normaliza UMA única vez para string decimal limpa
    const precoNormalizado = String(parsePrecoBR(produto.preco));
    const produtoNormalizado: Produto = { ...produto, preco: precoNormalizado };

    setItens((prev) => {
      const existente = prev.find((i) => i.produto.id === produtoNormalizado.id);
      if (existente) {
        return prev.map((i) =>
          i.produto.id === produtoNormalizado.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      return [...prev, { produto: produtoNormalizado, quantidade: 1 }];
    });
    setAberto(true);
  }, []);

  const removerItem = useCallback((produtoId: number) => {
    setItens((prev) => prev.filter((i) => i.produto.id !== produtoId));
  }, []);

  const atualizarQuantidade = useCallback(
    (produtoId: number, quantidade: number) => {
      if (quantidade <= 0) {
        removerItem(produtoId);
        return;
      }
      setItens((prev) =>
        prev.map((i) => (i.produto.id === produtoId ? { ...i, quantidade } : i))
      );
    },
    [removerItem]
  );

  const limparCarrinho = useCallback(() => {
    setItens([]);
  }, []);

  const totalItens = itens.reduce((acc, i) => acc + i.quantidade, 0);
  const totalValor = itens.reduce(
    (acc, i) => acc + parsePrecoBR(i.produto.preco) * i.quantidade,
    0
  );

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionarItem,
        removerItem,
        atualizarQuantidade,
        limparCarrinho,
        totalItens,
        totalValor,
        aberto,
        setAberto,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) {
    throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  }
  return ctx;
}