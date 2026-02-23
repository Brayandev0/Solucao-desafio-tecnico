import {ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatarMoeda } from "@/lib/formatador";
import { OrderCard } from "./card-pedidos-content";

// --- Types ---
export interface Order {
  uuid: string;
  address: string;
  payment_method: string;
  amount: string;
  status: "approved" | "pending" | "cancelled" | "processing";
  created_at: string;
}

interface UserInfo {
  name: string;
  email: string;
  created_at: string;
  UserOrders: Order[];
}



// --- Main Component ---
interface ProfileContentProps {
  userData: UserInfo;
}

export default function PedidosConteudo({ userData }: ProfileContentProps) {
  const totalSpent = userData.UserOrders.reduce((acc, o) => acc + parseFloat(o.amount), 0);

  return (
    <div className="space-y-6">


      <Tabs defaultValue="orders" className="space-y-6">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="orders" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            Meus Pedidos
            {userData.UserOrders.length > 0 && (
              <Badge className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {userData.UserOrders.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-6">
          {/* Summary card */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-muted-foreground mb-1">Total de pedidos</p>
                <p className="text-2xl font-bold">{userData.UserOrders.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-5">
                <p className="text-xs text-muted-foreground mb-1">Total gasto</p>
                <p className="text-2xl font-bold">{formatarMoeda(totalSpent)}</p>
              </CardContent>
            </Card>
            <Card className="col-span-2 sm:col-span-1">
              <CardContent className="pt-5">
                <p className="text-xs text-muted-foreground mb-1">Aprovados</p>
                <p className="text-2xl font-bold">
                  {userData.UserOrders.filter((o) => o.status === "approved").length}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Orders list */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de pedidos</CardTitle>
              <CardDescription>
                Todos os seus pedidos realizados na plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.UserOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <ShoppingBag className="h-12 w-12 text-muted-foreground/40 mb-3" />
                  <p className="text-muted-foreground">Você ainda não fez nenhum pedido.</p>
                </div>
              ) : (
                userData.UserOrders.map((order) => <OrderCard key={order.uuid} order={order} />)
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}