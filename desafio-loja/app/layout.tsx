import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CarrinhoProvider } from "@/hooks/use-carrinho";
import "./globals.css";



export const metadata: Metadata = {
  title: "LOJA - Design e Elegancia",
  description:
    "Loja virtual minimalista com produtos de design, decoracao e moveis de alta qualidade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
          <CarrinhoProvider>{children}</CarrinhoProvider>
      </body>
    </html>
  );
}
