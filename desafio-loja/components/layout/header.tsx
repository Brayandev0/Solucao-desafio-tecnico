"use client";

import Link from "next/link";
import { ShoppingBag, User, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useCarrinho } from "@/hooks/use-carrinho";
import { verificarAutenticacao } from "@/utils/Auth";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/produtos", label: "Produtos" },
  { href: "/contato", label: "Contato" },
];

export function Header() {
  const { totalItens, setAberto } = useCarrinho();

  const [logado, setLogado] = useState(false);

  useEffect(() => {
    async function checarAutenticacao() {
      const autenticado = await verificarAutenticacao();
      setLogado(autenticado);
    }

    checarAutenticacao();
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        <Link
          href="/"
          className="font-serif text-xl font-bold tracking-wide text-foreground"
        >
          LOJA
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAberto(true)}
            className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItens > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[10px] font-bold text-background">
                {totalItens}
              </span>
            )}
          </button>

          <div className="hidden items-center gap-2 md:flex">
            {logado ? (
              <div className="relative">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Perfil"
                    onClick={() => window.location.href = "/conta/perfil"}
                  >
                    <User className="h-8 w-8" />
                  </Button>

                </div>
              </div>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button size="sm">Registro</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

    </header>
  );
}
