import { BackendCategoriaProdutosResponse } from "@/components/produto/lista-produtos";
import api from "@/lib/api";
import type {
  Produto,
  ProdutoAPI,
  ProdutoAPIResponseAxios,
} from "@/types";


export class Produtos {
  static async buscarTodosProdutos(
    limit?: number,
    order?: "asc" | "desc",
    sortBy?: "name" | "price",
    start?: number
  ): Promise<Produto[]> {
    try {
      const ProdutosData: ProdutoAPIResponseAxios = await api.get(
        `${process.env.BACKEND_BASE_URL}/products?limit=${limit || ""}&order=${order || ""}&sortBy=${sortBy || ""}&start=${start || ""}`,
      );
      if (ProdutosData.data.code !== 200)
        throw new Error("Erro ao buscar produtos");

      return ProdutosData.data.produtos;
    } catch (error: any) {
      console.error("Erro ao buscar produtos:", error);
      return error.response.data; 
    }
  }


   static async buscarProdutoPorId(id: number) {
    try {
      const ProdutosData: ProdutoAPI = await api.get(
        `${process.env.BACKEND_BASE_URL}/products/${id}`,
      );
      if (ProdutosData.data.code !== 200)
        throw new Error("Erro ao buscar produtos");

      return ProdutosData.data;
    } catch (error:any) {
      console.error("Erro ao buscar produtos:", error);
      return error.response.data; 

    }
  }


 static async buscarCategoriasProdutos(): Promise<string[]> {
    try {
      const CategoriasData = await api.get(
        `${process.env.BACKEND_BASE_URL}/products/categories`,
      );
      if (CategoriasData.data.code !== 200)
        throw new Error("Erro ao buscar categorias");

      return CategoriasData.data.categorias;
      
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      return error.response.data; 

    }
  }
static async buscarProdutosPorCategoria(categoria: string): Promise<BackendCategoriaProdutosResponse> {
    try {
      const CategoriasData = await api.get(
        `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/products?categories=${categoria}`,
      );
      if (CategoriasData.data.code !== 200)
        throw new Error("Erro ao buscar produtos da categoria");

      return CategoriasData.data
      
    } catch (error) {
      console.error("Erro ao buscar produtos da categoria:", error);
      return error.response.data; 

    }
  }

}