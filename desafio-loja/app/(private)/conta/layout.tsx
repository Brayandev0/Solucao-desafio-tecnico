import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { CarrinhoDrawer } from "@/components/layout/carrinho-drawer";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <CarrinhoDrawer />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
