import { ShoppingBag, MapPin, CreditCard, Calendar, Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ItemCard } from "./card-items-content";

// --- Types ---
export interface OrderItem {
  id: number;
  name: string;
  image: string;
  price: string;
  quantity: number;
  product_id: number;
  created_at: string;
}

export interface Order {
  uuid: string;
  address: string;
  payment_method: string;
  amount: string;
  status: "approved" | "pending" | "cancelled" | "processing";
  created_at: string;
  OrderItems: OrderItem[];
}

// --- Helpers ---
const statusConfig: Record<Order["status"], { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  approved:   { label: "Aprovado",    variant: "default" },
  pending:    { label: "Pendente",    variant: "secondary" },
  processing: { label: "Processando", variant: "outline" },
  cancelled:  { label: "Cancelado",   variant: "destructive" },
};

const paymentLabels: Record<string, string> = {
  pix:          "PIX",
  credit_card:  "Cartão de Crédito",
  debit_card:   "Cartão de Débito",
  boleto:       "Boleto",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit", month: "2-digit", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

// --- Main Component ---
interface ProfileContentProps {
  order: Order; // objeto único, não array
}

export default function ItemsConteudo({ order }: ProfileContentProps) {
  const { label: statusLabel, variant: statusVariant } = statusConfig[order.status] ?? { label: order.status, variant: "outline" };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="orders" className="space-y-6">
        <TabsContent value="orders" className="space-y-6">

          {/* ── Cabeçalho do pedido ── */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
              <div className="space-y-1">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShoppingBag className="h-4 w-4" />
                  Pedido <span className="font-mono text-muted-foreground text-sm">#{order.uuid}</span>
                </CardTitle>
                <CardDescription>Detalhes e itens do pedido</CardDescription>
              </div>
              <Badge variant={statusVariant}>{statusLabel}</Badge>
            </CardHeader>

            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              {/* Endereço */}
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Endereço de entrega</p>
                  <p className="font-medium">{order.address}</p>
                </div>
              </div>

              {/* Meio de pagamento */}
              <div className="flex items-start gap-2">
                <CreditCard className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Meio de pagamento</p>
                  <p className="font-medium">{paymentLabels[order.payment_method] ?? order.payment_method}</p>
                </div>
              </div>

              {/* Data */}
              <div className="flex items-start gap-2">
                <Calendar className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Data do pedido</p>
                  <p className="font-medium">{formatDate(order.created_at)}</p>
                </div>
              </div>

              {/* Total */}
              <div className="flex items-start gap-2">
                <Hash className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">Total do pedido</p>
                  <p className="text-xl font-bold">{order.amount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* ── Itens do pedido ── */}
          <Card>
            <CardHeader>
            </CardHeader>
            <CardContent className="space-y-4">
              {order.OrderItems.map((item) => (
                <ItemCard key={item.id} item={item} />
              ))}
            </CardContent>
          </Card>

        </TabsContent>
      </Tabs>
    </div>
  );
}