export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: string;
  imagem: string;
  estoque: number;
}
export interface ProdutoAPI {
  data: {
    code: number;
    msg: string;
    produto: {
      id: number;
      nome: string;
      descricao: string;
      categoria: string;
      preco: string;
      desconto: string;
      avaliacaoNota: string;
      estoque: number;
      tags: string[];
      marca?: string;
      sku: string;
      peso: number;
      dimensoes: { width: number; height: number; depth: number };
      informacaoGarantia: string;
      informacaoEnvio: string;
      statusDisponibilidade: string;
      avaliacoes: {
        nota: number;
        nome: string;
        comentario: string;
        data: string;
        email: string;
      }[];
      politicaRetorno: string;
      quantidadeMinimaPedido: number;
      imagens: string[];
      thumbnail: string;
    };
  };
}

export interface ProdutoAPIResponseAxios {
  data: {
    code: number;
    msg: string;
    produtos: {
      id: number;
      nome: string;
      descricao: string;
      preco: string;
      imagem: string;
      estoque: number;
    }[];
  };
}

export interface ItemCarrinho {
  produto: Produto;
  quantidade: number;
}



export interface Pedido {
  id: number;
  data: string;
  status: string;
  itens: ItemCarrinho[];
  total: number;
  formaPagamento: string;
}

export interface MetaDadosSEO {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: string;
}
