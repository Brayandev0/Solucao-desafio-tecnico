import { Lock, Shield, Truck } from "lucide-react";

export function SeloConfianca() {
  return (
    <div className="flex items-center justify-center gap-6 border-t border-border pt-6 text-xs text-muted-foreground">
      <span className="flex items-center gap-1.5">
        <Lock className="h-3.5 w-3.5" />
        Pagamento seguro
      </span>
      <span className="flex items-center gap-1.5">
        <Shield className="h-3.5 w-3.5" />
        Dados protegidos
      </span>
      <span className="flex items-center gap-1.5">
        <Truck className="h-3.5 w-3.5" />
        Entrega garantida
      </span>
    </div>
  );
}