import { CheckCircle2 } from "lucide-react";
import { ETAPAS, type EtapaId } from "./types";

interface IndicadorEtapasProps {
  etapaAtual: EtapaId;
  etapasConcluidas: EtapaId[];
}

export function IndicadorEtapas({ etapaAtual, etapasConcluidas }: IndicadorEtapasProps) {
  const currentIndex = ETAPAS.findIndex((e) => e.id === etapaAtual);

  return (
    <nav aria-label="Etapas do checkout" className="mb-10">
      <ol className="flex items-center">
        {ETAPAS.map((etapa, index) => {
          const isActive = etapa.id === etapaAtual;
          const isDone = etapasConcluidas.includes(etapa.id);
          const isPast = index < currentIndex;

          return (
            <li key={etapa.id} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-500 ${
                    isDone || isPast
                      ? "border-primary bg-primary text-primary-foreground"
                      : isActive
                        ? "border-foreground bg-foreground text-background"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  {isDone || isPast ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`text-xs font-medium transition-colors duration-300 ${
                    isActive || isDone || isPast
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {etapa.label}
                </span>
              </div>

              {index < ETAPAS.length - 1 && (
                <div className="mx-2 mb-5 h-0.5 flex-1">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-in-out"
                    style={{
                      background: isPast || isDone ? "var(--primary)" : "var(--border)",
                    }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}