import {
  ArrowLeft,
  CreditCardIcon,
  FileText,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatarMoeda } from "@/lib/formatador";
import { formasPagamento, type FormaPagamentoId } from "../types";
import { SeloConfianca } from "../checkout-selo-confianca";
import { FaPix } from "react-icons/fa6";

const iconMap = {
  cartao: CreditCardIcon,
  pix: FaPix,
  boleto: FileText,
} as const;

interface StepPagamentoProps {
  totalValor: number;
  frete: number;
  formaSelecionada: FormaPagamentoId | null;
  processando: boolean;
  onFormaChange: (forma: FormaPagamentoId) => void;
  onFinalizar: () => void;
  onVoltar: () => void;
}

export function StepPagamento({
  totalValor,
  frete,
  formaSelecionada,
  processando,
  onFormaChange,
  onFinalizar,
  onVoltar,
}: StepPagamentoProps) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-lg font-semibold text-foreground">
        Forma de pagamento
      </h2>

      <div className="flex flex-col gap-3">
        {formasPagamento.map((forma) => {
          const Icon = iconMap[forma.id];
          const selecionado = formaSelecionada === forma.id;

          return (
            <button
              key={forma.id}
              onClick={() => onFormaChange(forma.id)}
              className={`flex items-center gap-4 rounded-xl border-2 px-5 py-4 text-left transition-all duration-200 ${
                selecionado
                  ? "border-foreground bg-secondary"
                  : "border-border bg-background hover:border-foreground/20 hover:bg-secondary/50"
              }`}
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors ${
                  selecionado
                    ? "bg-foreground text-background"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-foreground">
                  {forma.label}
                </p>
                <p className="text-xs text-muted-foreground">{forma.desc}</p>
              </div>
              <div
                className={`flex h-5 w-5 items-center justify-center rounded-full border-2 transition-all ${
                  selecionado ? "border-foreground bg-foreground" : "border-border"
                }`}
              >
                {selecionado && (
                  <div className="h-2 w-2 rounded-full bg-background" />
                )}
              </div>
            </button>
          );
        })}
      </div>


      <Separator />

 
      <div className="flex gap-3">
        <Button
          variant="outline"
          size="lg"
          className="gap-2"
          onClick={onVoltar}
          disabled={processando}
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <Button
          size="lg"
          className="flex-1 gap-2 text-base"
          disabled={!formaSelecionada || processando}
          onClick={onFinalizar}
        >
          <Lock className="h-4 w-4" />
          Finalizar pedido — {formatarMoeda(totalValor + frete)}
        </Button>
      </div>

      <SeloConfianca />
    </div>
  );
}