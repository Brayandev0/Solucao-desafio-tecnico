import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SeloConfianca } from "../checkout-selo-confianca";

interface StepConfirmacaoProps {
  pedidoId: string | null;
  onReset: () => void;
}

export function StepConfirmacao({ pedidoId, onReset }: StepConfirmacaoProps) {
  const router = useRouter();
  const [contador, setContador] = useState(5);

  useEffect(() => {
    if (contador === 0) {
      onReset();
      router.push("/conta/perfil");
      return;
    }

    const timer = setTimeout(() => setContador((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [contador, router]);

  const progresso = ((5 - contador) / 5) * 100;

  return (
    <div
      className="flex flex-col items-center gap-6 py-10 text-center"
      style={{ animation: "bounceIn 0.6s ease-out" }}
    >
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary">
        <CheckCircle2 className="h-12 w-12 text-primary-foreground" />
      </div>

      <div className="flex flex-col gap-2">
        <h1 className="font-serif text-3xl font-bold text-foreground lg:text-4xl">
          Pedido confirmado!
        </h1>
        <p className="text-lg text-muted-foreground">
          Pedido{" "}
          <span className="font-semibold text-foreground">#{pedidoId}</span>{" "}
          realizado com sucesso.
        </p>
      </div>

      <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
        Voce recebera um e-mail com os detalhes do pedido e as informacoes de
        rastreamento assim que o envio for realizado.
      </p>

      {/* Contador de redirecionamento */}
      <div className="flex w-full max-w-sm flex-col items-center gap-3">
        <p className="text-sm text-muted-foreground">
          Redirecionando para seus pedidos em{" "}
          <span className="font-semibold text-foreground">{contador}s</span>
        </p>

        {/* Barra de progresso */}
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-1000 ease-linear"
            style={{ width: `${progresso}%` }}
          />
        </div>
      </div>

      <div className="w-full pt-4">
        <SeloConfianca />
      </div>
    </div>
  );
}