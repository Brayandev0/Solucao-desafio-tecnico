"use client"
import { formatDate } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, Calendar, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

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

export function ItemCard({ item }: { item: OrderItem }) {
  return (
    <div className="rounded-xl border bg-card p-5 transition-shadow hover:shadow-md">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-muted">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm leading-snug line-clamp-2">{item.name}</p>
          <p className="text-xs text-muted-foreground mt-0.5">
            ID do produto: <span className="font-mono">#{item.product_id}</span>
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Details Grid */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-start gap-2 text-sm">
          <ShoppingBag className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Quantidade</p>
            <p className="font-medium">{item.quantity} unid.</p>
          </div>
        </div>

        <div className="flex items-start gap-2 text-sm">
          <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          <div>
            <p className="text-xs text-muted-foreground mb-0.5">Data da compra</p>
            <p>{formatDate(new Date(item.created_at), "dd/MM/yyyy")}</p>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Footer — price */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">Preço unitário</span>
        <span className="text-base font-bold text-foreground">{item.price}</span>
      </div>
    </div>
  );
}