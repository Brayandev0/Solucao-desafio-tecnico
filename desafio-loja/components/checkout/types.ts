export const ETAPAS = [
  { id: "carrinho", label: "Carrinho" },
  { id: "entrega", label: "Entrega" },
  { id: "pagamento", label: "Pagamento" },
  { id: "confirmacao", label: "Confirmacao" },
] as const;

export type EtapaId = (typeof ETAPAS)[number]["id"];

export interface ItemCarrinho {
  produto: {
    id: number;
    nome: string;
    imagem: string;
    preco: number;
    categoria?: string;
  };
  quantidade: number;
}

export interface Endereco {
  endereco: string;
}

export const formasPagamento = [
  {
    id: "cartao",
    label: "Cartao de credito",
    desc: "Ate 12x sem juros",
  },
  {
    id: "pix",
    label: "Pix",
    desc: "Aprovacao instantanea",
  },
  {
    id: "boleto",
    label: "Boleto bancario",
    desc: "Vencimento em 3 dias",
  },
] as const;

export type FormaPagamentoId = (typeof formasPagamento)[number]["id"];