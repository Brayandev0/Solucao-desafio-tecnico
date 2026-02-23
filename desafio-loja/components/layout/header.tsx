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
  const [menuAberto, setMenuAberto] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (menuAberto && !target.closest(".menu-container")) {
        setMenuAberto(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuAberto]);
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
                    onClick={() => setMenuAberto(!menuAberto)}
                  >
                    <User className="h-8 w-8" />
                  </Button>
                  {menuAberto && (
                    <div className="menu-container absolute right-0 mt-2 w-48 rounded-md bg-card shadow-lg ring-1 ring-black ring-opacity-5 transition-opacity duration-200 ease-in-out">
                      <Link
                        href="/conta/perfil"
                        onClick={() => {setMenuAberto(false); window.location.href = "/conta/perfil";}}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-left hover:bg-accent"
                        >
                          Ver meu perfil
                        </Button>
                      </Link>
                      <Link
                        href="/conta/perfil"
                        onClick={() => setMenuAberto(false)}
                      >
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full text-left hover:bg-accent"
                        >
                          Ver meus pedidos
                        </Button>
                      </Link>
                    </div>
                  )}
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

          <button
            onClick={() => setMenuAberto(!menuAberto)}
            className="rounded-lg p-2 text-muted-foreground md:hidden"
            aria-label="Menu"
          >
            {menuAberto ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {menuAberto && (
        <div className="border-t border-border bg-card px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuAberto(false)}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex items-center gap-2 border-t border-border pt-3">
              {logado ? (
                <Link href="/perfil" onClick={() => setMenuAberto(false)}>
                  <Button variant="ghost" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Perfil
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login" onClick={() => setMenuAberto(false)}>
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/registro" onClick={() => setMenuAberto(false)}>
                    <Button size="sm">Registro</Button>
                  </Link>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
