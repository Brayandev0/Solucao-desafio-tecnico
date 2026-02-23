"use client"
import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "@/hooks/use-carrinho";

import { type EtapaId, type Endereco, type FormaPagamentoId } from "./types";

import { IndicadorEtapas } from "./checkout-indicador-etapas";
import { ResumoLateral } from "./checkout-resumo-lateral";
import { StepCarrinho } from "./Etapas-checkout/etapa-carrinho-checkout";
import { StepEntrega } from "./Etapas-checkout/etapa-entrega-checkout";
import { StepPagamento } from "./Etapas-checkout/etapa-pagamento-checkout";
import { StepConfirmacao } from "./Etapas-checkout/etapa-confirmacao-checkout";
import { RealizarPedido } from "@/services/Usuario";


export function CheckoutConteudo() {
  const { itens, totalValor, limparCarrinho, removerItem, atualizarQuantidade } =
    useCarrinho();
  const [etapaAtual, setEtapaAtual] = useState<EtapaId>("carrinho");
  const [etapasConcluidas, setEtapasConcluidas] = useState<EtapaId[]>([]);
  const [formaSelecionada, setFormaSelecionada] = useState<FormaPagamentoId | null>(null);
  const [pedidoId, setPedidoId] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);
  const [endereco, setEndereco] = useState<Endereco>({
    endereco: "",
  });

  // Garante que ao montar o componente (ex: usuário volta via browser)
  // o estado de processando seja sempre resetado.
  useEffect(() => {
    setProcessando(false);
  }, []);

  // Intercepta o botão "Voltar" do browser enquanto está processando
  // para evitar que o usuário fique preso na tela de carregamento.
  useEffect(() => {
    if (!processando) return;

    const handlePopState = () => {
      setProcessando(false);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [processando]);

  const resetarCheckout = useCallback(() => {
    setEtapaAtual("carrinho");
    setEtapasConcluidas([]);
    setFormaSelecionada(null);
    setPedidoId(null);
    setProcessando(false);
    setEndereco({ endereco: "" });
  }, []);

  const frete = totalValor >= 299 ? 0 : 29.9;

  const avancar = useCallback(
    (proximaEtapa: EtapaId) => {
      setEtapasConcluidas((prev) =>
        prev.includes(etapaAtual) ? prev : [...prev, etapaAtual]
      );
      setEtapaAtual(proximaEtapa);
    },
    [etapaAtual]
  );

  async function processarPagamento() {
    if (!formaSelecionada) return;
    setProcessando(true);

    try {
      const response = await RealizarPedido(
        endereco.endereco,
        formaSelecionada,
        itens.map((item) => ({
          id: item.produto.id,
          quantidade: item.quantidade,
        })),
      );

      if (response.code !== 201) {
        console.error("Erro ao processar pedido:", response);
        setProcessando(false);
        return;
      }

      setPedidoId(response.idPedido);
      // Limpa o carrinho ANTES de avançar para não cair no guard de carrinho vazio
      limparCarrinho();
      avancar("confirmacao");
    } catch (err) {
      console.error("Erro ao processar pagamento:", err);
      setPedidoId(null);
      limparCarrinho();
      avancar("confirmacao");
    } finally {
      setProcessando(false);
    }
  }

  /* ── Confirmacao (deve vir antes do guard de carrinho vazio) ── */
  if (etapaAtual === "confirmacao") {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 lg:py-20">
        <IndicadorEtapas
          etapaAtual="confirmacao"
          etapasConcluidas={["carrinho", "entrega", "pagamento", "confirmacao"]}
        />
        <StepConfirmacao onReset={resetarCheckout} pedidoId={pedidoId} />
      </div>
    );
  }

  /* ── Carrinho vazio ───────────────────────────── */
  if (itens.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-5 px-4 py-20">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <ShoppingBag className="h-8 w-8 text-muted-foreground" />
        </div>
        <h2 className="font-serif text-2xl font-bold text-foreground">
          Seu carrinho esta vazio
        </h2>
        <p className="max-w-sm text-center text-muted-foreground">
          Explore nossos produtos e encontre algo especial para voce.
        </p>
        <Link href="/produtos">
          <Button size="lg" className="mt-2 gap-2">
            Explorar produtos
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  /* ── Processando pagamento ────────────────────── */
  if (processando) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 lg:py-20">
        <IndicadorEtapas etapaAtual="pagamento" etapasConcluidas={etapasConcluidas} />
        <div className="flex min-h-[40vh] flex-col items-center justify-center gap-6">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-muted border-t-foreground" />
          <div className="text-center">
            <p className="text-lg font-semibold text-foreground">
              Processando pagamento...
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Aguarde enquanto confirmamos sua transacao.
            </p>
          </div>
          {/* Botão de escape caso o processamento trave */}
          <Button
            variant="ghost"
            size="sm"
            className="mt-4 text-muted-foreground"
            onClick={() => setProcessando(false)}
          >
            Cancelar
          </Button>
        </div>
      </div>
    );
  }

  /* ── Layout principal ─────────────────────────── */
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 lg:px-8 lg:py-16">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Continuar comprando
      </Link>

      <h1 className="mb-2 font-serif text-3xl font-bold text-foreground lg:text-4xl">
        Checkout
      </h1>
      <p className="mb-8 text-muted-foreground">
        Complete as etapas abaixo para finalizar seu pedido.
      </p>

      <IndicadorEtapas etapaAtual={etapaAtual} etapasConcluidas={etapasConcluidas} />

      <div className="flex flex-col gap-10 lg:flex-row">
        {/* Etapa ativa */}
        <div className="flex-1">
          {etapaAtual === "carrinho" && (
            <StepCarrinho
              itens={itens}
              totalValor={totalValor}
              onAtualizarQuantidade={atualizarQuantidade}
              onRemoverItem={removerItem}
              onAvancar={() => avancar("entrega")}
            />
          )}

          {etapaAtual === "entrega" && (
            <StepEntrega
              endereco={endereco}
              frete={frete}
              onEnderecoChange={setEndereco}
              onAvancar={() => avancar("pagamento")}
              onVoltar={() => setEtapaAtual("carrinho")}
            />
          )}

          {etapaAtual === "pagamento" && (
            <StepPagamento
              endereco={endereco}
              totalValor={totalValor}
              frete={frete}
              formaSelecionada={formaSelecionada}
              processando={processando}
              onFormaChange={setFormaSelecionada}
              onFinalizar={processarPagamento}
              onVoltar={() => setEtapaAtual("entrega")}
            />
          )}
        </div>

        {/* Resumo lateral */}
        <div className="w-full shrink-0 lg:w-80">
          <div className="lg:sticky lg:top-24">
            <ResumoLateral itens={itens} totalValor={totalValor} frete={frete} />
          </div>
        </div>
      </div>
    </div>
  );
}