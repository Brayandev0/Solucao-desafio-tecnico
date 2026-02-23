"use client";

import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { CardProduto } from "@/components/produto/card-produto";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Produtos } from "@/services/Produtos";

// ── Tipos alinhados ao backend ──────────────────────────────────────────────

export interface Categoria {
  slug: string;
  name: string;
  url: string;
}

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  estoque: number;
}

// Formato retornado pelo backend
export interface BackendCategoriaProdutosResponse {
  code: number;
  msg: string;
  produtos: Produto[];
}



interface ListaProdutosProps {
  produtosIniciais: Produto[];
  categorias: Categoria[];
}

export function ListaProdutos({
  produtosIniciais,
  categorias,
}: ListaProdutosProps) {
  const [busca, setBusca] = useState("");
  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);
  const [ordenacao, setOrdenacao] = useState<string>("padrao");
  const [sidebarMobileAberta, setSidebarMobileAberta] = useState(false);

  const [produtosAtivos, setProdutosAtivos] = useState<Produto[]>(produtosIniciais);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  // Refs para acessar props estáveis dentro do efeito sem adicioná-las às deps,
  // evitando que o efeito dispare por qualquer re-render do componente pai.
  const produtosIniciaisRef = useRef(produtosIniciais);
  const categoriasRef = useRef(categorias);

  // Executa APENAS quando o usuário seleciona/deseleciona uma categoria
  useEffect(() => {
    if (categoriasSelecionadas.length === 0) {
      setProdutosAtivos(produtosIniciaisRef.current);
      return;
    }

    const nomesDasCategorias = categoriasRef.current
      .filter((c) => categoriasSelecionadas.includes(c.slug))
      .map((c) => c.name);

    setCarregando(true);
    setErro(null);

    const buscarProdutos = async () => {
      try {
        const respostas = await Promise.all(
          nomesDasCategorias.map(async (nome) => {
            const r:BackendCategoriaProdutosResponse = await Produtos.buscarProdutosPorCategoria(nome);

            if(r.code !== 200) {
              throw new Error(`Erro ao buscar produtos da categoria ${nome}`);
            }

            return r.produtos;              
          })
        );
setProdutosAtivos(respostas.flat());
      } catch {
        setErro("Não foi possível carregar os produtos. Tente novamente.");
      } finally {
        setCarregando(false);
      }
    };

    buscarProdutos();
  }, [categoriasSelecionadas]); 

  const toggleCategoria = useCallback((slug: string) => {
    setCategoriasSelecionadas((prev) =>
      prev.includes(slug) ? prev.filter((c) => c !== slug) : [...prev, slug]
    );
  }, []);

  const limparFiltros = useCallback(() => {
    setCategoriasSelecionadas([]);
    setBusca("");
    setOrdenacao("padrao");
  }, []);

  const produtosFiltrados = useMemo(() => {
    let resultado = [...produtosAtivos];

    if (busca.trim()) {
      const termo = busca.toLowerCase();
      resultado = resultado.filter(
        (p) =>
          p.nome.toLowerCase().includes(termo) ||
          p.descricao.toLowerCase().includes(termo)
      );
    }

    if (ordenacao === "menor-preco") {
      resultado.sort((a, b) => parseMoedaBR(a.preco) - parseMoedaBR(b.preco));
    } else if (ordenacao === "maior-preco") {
      resultado.sort((a, b) => parseMoedaBR(b.preco) - parseMoedaBR(a.preco));
    } else if (ordenacao === "nome-az") {
      resultado.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    return resultado;
  }, [produtosAtivos, busca, ordenacao]);

  const temFiltrosAtivos =
    categoriasSelecionadas.length > 0 || busca.trim() !== "";

  return (
    <div className="flex min-h-screen items-start w-full">
      {/* ── Sidebar desktop ── */}
      <div className="hidden w-64 shrink-0 self-stretch pr-5 lg:block">
        <div className="px-6 py-10">
          <div className="mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Coleção
            </span>
            <h1 className="mt-1 font-serif text-3xl font-bold text-foreground">
              Todos os produtos
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {produtosFiltrados.length} produto
              {produtosFiltrados.length !== 1 ? "s" : ""} encontrado
              {produtosFiltrados.length !== 1 ? "s" : ""}
            </p>
          </div>

          <Separator className="mb-6" />

          <SidebarContent
            categorias={categorias}
            categoriasSelecionadas={categoriasSelecionadas}
            toggleCategoria={toggleCategoria}
            temFiltrosAtivos={temFiltrosAtivos}
            limparFiltros={limparFiltros}
          />
        </div>
      </div>

      {/* ── Mobile sidebar overlay ── */}
      {sidebarMobileAberta && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20"
            onClick={() => setSidebarMobileAberta(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[70vh] overflow-y-auto rounded-t-2xl bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium uppercase tracking-widest text-foreground">
                Filtros
              </h3>
              <button
                onClick={() => setSidebarMobileAberta(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <SidebarContent
              categorias={categorias}
              categoriasSelecionadas={categoriasSelecionadas}
              toggleCategoria={toggleCategoria}
              temFiltrosAtivos={temFiltrosAtivos}
              limparFiltros={limparFiltros}
            />
            <Button
              className="mt-6 w-full"
              onClick={() => setSidebarMobileAberta(false)}
            >
              Aplicar filtros
            </Button>
          </div>
        </div>
      )}

      {/* ── Área de conteúdo ── */}
      <div className="min-w-0 flex-1 px-8 py-10 lg:py-16">
        {/* Mobile title */}
        <div className="mb-6 lg:hidden">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Coleção
          </span>
          <h1 className="mt-1 font-serif text-3xl font-bold text-foreground">
            Todos os produtos
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {produtosFiltrados.length} produto
            {produtosFiltrados.length !== 1 ? "s" : ""} encontrado
            {produtosFiltrados.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Barra de busca + ordenação */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-xl flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              className="pl-10 text-sm"
            />
            {busca && (
              <button
                onClick={() => setBusca("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 lg:hidden"
              onClick={() => setSidebarMobileAberta(!sidebarMobileAberta)}
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filtros
              {categoriasSelecionadas.length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                  {categoriasSelecionadas.length}
                </span>
              )}
            </Button>

            <Select value={ordenacao} onValueChange={setOrdenacao}>
              <SelectTrigger className="w-45 text-sm">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="padrao">Mais relevantes</SelectItem>
                <SelectItem value="menor-preco">Menor preço</SelectItem>
                <SelectItem value="maior-preco">Maior preço</SelectItem>
                <SelectItem value="nome-az">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Chips de filtros ativos */}
        {temFiltrosAtivos && (
          <div className="mb-5 flex flex-wrap items-center gap-2">
            {categoriasSelecionadas.map((slug) => {
              const cat = categorias.find((c) => c.slug === slug);
              return (
                <button
                  key={slug}
                  onClick={() => toggleCategoria(slug)}
                  className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {cat?.name ?? slug}
                  <X className="h-3 w-3" />
                </button>
              );
            })}
            {busca && (
              <span className="flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground">
                {`"${busca}"`}
                <button onClick={() => setBusca("")}>
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            <button
              onClick={limparFiltros}
              className="text-xs text-muted-foreground underline underline-offset-4 hover:text-foreground"
            >
              Limpar tudo
            </button>
          </div>
        )}

        {/* Estado de carregamento */}
        {carregando && (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {/* Estado de erro */}
        {!carregando && erro && (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm text-destructive">{erro}</p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => {
                const prev = [...categoriasSelecionadas];
                setCategoriasSelecionadas([]);
                setTimeout(() => setCategoriasSelecionadas(prev), 0);
              }}
            >
              Tentar novamente
            </Button>
          </div>
        )}

        {/* Grid de produtos */}
        {!carregando && !erro && (
          <>
            {produtosFiltrados.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
                {produtosFiltrados.map((produto) => (
               
                  <CardProduto key={produto.id} produto={produto} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <p className="text-sm text-muted-foreground">
                  Nenhum produto encontrado.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={limparFiltros}
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Sidebar content ─────────────────────────────────────────────────────────

function SidebarContent({
  categorias,
  categoriasSelecionadas,
  toggleCategoria,
  temFiltrosAtivos,
  limparFiltros,
}: {
  categorias: Categoria[];
  categoriasSelecionadas: string[];
  toggleCategoria: (slug: string) => void;
  temFiltrosAtivos: boolean;
  limparFiltros: () => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Categorias
        </h3>
        <div className="flex flex-col gap-3">
          {categorias.map((cat) => (
            <label
              key={cat.slug}
              className="flex cursor-pointer items-center gap-3 text-sm text-foreground"
            >
              <Checkbox
                checked={categoriasSelecionadas.includes(cat.slug)}
                onCheckedChange={() => toggleCategoria(cat.slug)}
              />
              {cat.name}
            </label>
          ))}
        </div>
      </div>

      <Separator />

      {temFiltrosAtivos && (
        <button
          onClick={limparFiltros}
          className="text-left text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          Limpar todos os filtros
        </button>
      )}
    </div>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────────

/** Converte "R$ 54,95" → 54.95 para poder ordenar numericamente */
function parseMoedaBR(valor: string): number {
  return parseFloat(valor.replace(/[R$\s.]/g, "").replace(",", "."));
}