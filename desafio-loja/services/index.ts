import { Produtos } from "./Produtos";

export class LojaApi {
  public produtos: Produtos;

  constructor() {
    this.produtos = new Produtos();
  }
}

export const api = new LojaApi();
