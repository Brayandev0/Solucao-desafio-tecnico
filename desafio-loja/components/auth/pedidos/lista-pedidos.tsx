"use client"
import { Badge } from "@/components/ui/badge";
import { formatarMoeda } from "@/lib/formatador";

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

interface ListaPedidosProps {
  orders: Order[];
}

const statusConfig: Record<Order["status"], { label: string; className: string }> = {
  approved:   { label: "Aprovado",    className: "bg-green-100 text-green-700 border-green-200" },
  pending:    { label: "Pendente",    className: "bg-yellow-100 text-yellow-700 border-yellow-200" },
  cancelled:  { label: "Cancelado",   className: "bg-red-100 text-red-700 border-red-200" },
  processing: { label: "Processando", className: "bg-blue-100 text-blue-700 border-blue-200" },
};

export function ListaPedidos({ orders }: ListaPedidosProps) {

  const boxIcon =
    "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg";

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Lista de Pedidos</h2>

      {orders.map((order) => {
        const status = statusConfig[order.status];
        const formattedDate = new Date(order.created_at).toLocaleDateString("pt-BR", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });

        return (
          <div
            key={order.uuid}
            className="flex flex-col max-w-4xl rounded-md border border-gray-300 text-gray-800 overflow-hidden"
          >
            {/* ── Seção superior: UUID · Data · Total ── */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-gray-50 border-b border-gray-200 px-5 py-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                <span>
                  <span className="font-medium text-gray-700">Pedido </span>
                  <span className="font-mono text-gray-600">{order.uuid}</span>
                </span>
                <span className="text-gray-300 hidden sm:block">|</span>
                <span>
                  <span className="font-medium text-gray-700">Data: </span>
                  {formattedDate}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Badge variant="outline" className={`text-xs px-2 py-0.5 ${status.className}`}>
                  {status.label}
                </Badge>
                <span className="text-sm font-semibold text-gray-800">
                  {formatarMoeda(parseFloat(order.amount))}
                </span>
              </div>
            </div>

            {/* ── Seção inferior: mantém layout original ── */}
            <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5">
              {/* Items */}
              <div className="flex gap-5">
                <img
                  className="w-12 h-12 object-cover opacity-60"
                  src={boxIcon}
                  alt="boxIcon"
                />
                <div className="flex flex-col justify-center gap-2">
                  {order.OrderItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-2">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-8 h-8 rounded object-cover border border-gray-200"
                      />
                      <p className="font-medium text-sm">
                        {item.name}{" "}
                        <span className={`text-indigo-500 ${item.quantity < 2 ? "hidden" : ""}`}>
                          x {item.quantity}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Endereço */}
              <div className="text-sm">
                <p className="font-medium mb-1">Endereço</p>
                <p className="text-gray-500">{order.address}</p>
              </div>

              {/* Valor */}
              <p className="font-medium text-base my-auto text-black/70">
                {formatarMoeda(parseFloat(order.amount))}
              </p>

              {/* Pagamento */}
              <div className="flex flex-col text-sm">
                <p>Método: <span className="capitalize">{order.payment_method}</span></p>
                <p>Data: {formattedDate}</p>
                <p>Status: {status.label}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}