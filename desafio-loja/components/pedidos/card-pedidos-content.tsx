"use client";
import { formatDate } from "date-fns";
import { Separator } from "@/components/ui/separator";
import {
  Package,
  CheckCircle2,
  Clock,
  MapPin,
  CreditCard,
  Calendar,
  ExternalLink,
} from "lucide-react";
import { Order } from "./profile-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatarMoeda } from "@/lib/formatador";

// --- Helpers ---
const STATUS_CONFIG: Record<
  Order["status"],
  { label: string; className: string; icon: React.ReactNode }
> = {
  approved: {
    label: "Aprovado",
    className:
      "border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800",
    icon: <CheckCircle2 className="h-3.5 w-3.5" />,
  },
  pending: {
    label: "Pendente",
    className:
      "border-amber-200 bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  processing: {
    label: "Processando",
    className:
      "border-blue-200 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
  cancelled: {
    label: "Cancelado",
    className:
      "border-red-200 bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 dark:border-red-800",
    icon: <Clock className="h-3.5 w-3.5" />,
  },
};

const PAYMENT_LABELS: Record<string, string> = {
  pix: "PIX",
  credit_card: "Cartão de Crédito",
  boleto: "Boleto",
  debit_card: "Cartão de Débito",
};

function shortUuid(uuid: string) {
  return `#${uuid.slice(0, 8).toUpperCase()}`;
}

export function OrderCard({ order }: { order: Order }) {
  const statusCfg = STATUS_CONFIG[order.status] ?? STATUS_CONFIG.pending;

  return (
    <div className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <p className="font-semibold text-sm">{shortUuid(order.uuid)}</p>
            <p className="text-xs text-muted-foreground font-mono">
              {order.uuid}
            </p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`flex items-center gap-1 text-xs ${statusCfg.className}`}
        >
          {statusCfg.icon}
          {statusCfg.label}
        </Badge>
      </div>

      <Separator className="my-4" />

      {/* Details Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">
              Endereço de entrega
            </p>
            <p className="leading-snug capitalize">{order.address}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <CreditCard className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">
              Método de pagamento
            </p>
            <p>
              {PAYMENT_LABELS[order.payment_method] ??
                order.payment_method.toUpperCase()}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">
              Data do pedido
            </p>
            <p>{formatDate(new Date(order.created_at), "dd/MM/yyyy")}</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <div className="mt-0.5 h-4 w-4 shrink-0 flex items-center justify-center text-muted-foreground font-bold text-xs">
            R$
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Total</p>
            <p className="font-semibold text-base text-foreground">
              {formatarMoeda(Number(order.amount))}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Footer */}
      <Button
        variant="outline"
        size="sm"
        className="w-full gap-2"
        onClick={() => {
          window.location.href = `/conta/pedido/${order.uuid}`;
        }}
      >
        <ExternalLink className="h-4 w-4" />
        Ver Pedido
      </Button>
    </div>
  );
}
