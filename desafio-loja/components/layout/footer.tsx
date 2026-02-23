import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h3 className="font-serif text-lg font-bold text-foreground">
              LOJA
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Design e elegancia para transformar seus ambientes. Produtos
              selecionados com curadoria e qualidade.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Navegacao
            </h4>
            <nav className="mt-3 flex flex-col gap-2">
              <Link
                href="/"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Inicio
              </Link>
              <Link
                href="/produtos"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Produtos
              </Link>
              <Link
                href="/contato"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                Contato
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Atendimento
            </h4>
            <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
              <span>contato@loja.com.br</span>
              <span>(11) 99999-0000</span>
              <span>Seg a Sex, 9h as 18h</span>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          2026 LOJA. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
