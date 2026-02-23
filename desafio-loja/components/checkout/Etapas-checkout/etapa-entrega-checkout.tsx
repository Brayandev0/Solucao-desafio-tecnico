import { ArrowLeft, ArrowRight, MapPin, Truck } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatarMoeda } from "@/lib/formatador";
import { Endereco } from "../types";

interface StepEntregaProps {
  endereco: Endereco;
  frete: number;
  onEnderecoChange: (endereco: Endereco) => void;
  onAvancar: () => void;
  onVoltar: () => void;
}

function validarEndereco(endereco: Endereco): string | null {
  if (!endereco.endereco?.trim()) {
    return "Endereço é obrigatório";
  }
  if (endereco.endereco.trim().length < 10) {
    return "Informe o endereço completo (mínimo 10 caracteres)";
  }
  return null;
}

export function StepEntrega({
  endereco,
  frete,
  onEnderecoChange,
  onAvancar,
  onVoltar,
}: StepEntregaProps) {
  const [erro, setErro] = useState<string | null>(null);
  const [tocado, setTocado] = useState(false);

  function set(field: keyof Endereco, value: string) {
    const novoEndereco = { ...endereco, [field]: value };
    onEnderecoChange(novoEndereco);

    if (tocado) {
      setErro(validarEndereco(novoEndereco));
    }
  }

  function handleBlur() {
    setTocado(true);
    setErro(validarEndereco(endereco));
  }

  function handleAvancar() {
    setTocado(true);
    const erroAtual = validarEndereco(endereco);
    setErro(erroAtual);

    if (!erroAtual) {
      onAvancar();
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <h2 className="text-lg font-semibold text-foreground">
          Endereco de entrega
        </h2>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="endereco" className="text-sm font-medium text-foreground">
            Endereco completo <span className="text-destructive">*</span>
          </Label>
          <Input
            id="endereco"
            placeholder="Seu endereco completo"
            value={endereco.endereco}
            onChange={(e) => set("endereco", e.target.value)}
            onBlur={handleBlur}
            className={`h-12 rounded-xl border-border bg-background text-foreground ${
              erro ? "border-destructive focus-visible:ring-destructive" : ""
            }`}
          />
          {erro && (
            <p className="text-xs text-destructive">{erro}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-foreground">Metodo de envio</h3>
        <div className="flex items-center justify-between rounded-xl border-2 border-foreground bg-secondary px-5 py-4">
          <div className="flex items-center gap-3">
            <Truck className="h-5 w-5 text-foreground" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {frete === 0 ? "Frete gratis" : "Entrega padrao"}
              </p>
              <p className="text-xs text-muted-foreground">5-7 dias uteis</p>
            </div>
          </div>
          <span className="text-sm font-bold text-foreground">
            {frete === 0 ? "Gratis" : formatarMoeda(frete)}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" size="lg" className="gap-2" onClick={onVoltar}>
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        <Button size="lg" className="flex-1 gap-2 text-base" onClick={handleAvancar}>
          Continuar para pagamento
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}