import { httpFetchTimeout } from "../Utils/httpClient.js";
import { mapearListaProdutos,mapearProdutoPorId } from "../Utils/mapeadorData.js";
export async function BuscarProdutosController(req, res) {
  try {
    const url = req.urlBase;

    const data = await httpFetchTimeout(url)
    return res.json({
      code: 200,
      msg: "Produtos buscados com sucesso",
      produtos: data ? mapearListaProdutos(data.products) : []
  })
    
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    if (error.name === "AbortError") {
      return res.status(504).json({
        msg: "A requisição para buscar produtos excedeu o tempo limite",
        code: 504,
      });
    }
    return res.status(500).json({ msg: "Erro ao buscar produtos", code: 500 });
  }
}

export async function BuscarProdutosPorIdController(req, res) {
  try {
    const url = req.urlBase;

    const data = await httpFetchTimeout(url)
    
    return res.json({
      code: 200,
      msg: "Produto buscado com sucesso",
      produto: data ? mapearProdutoPorId(data) : [],
    });

  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    if (error.name === "AbortError") {
      return res.status(504).json({
        msg: "A requisição para buscar produtos excedeu o tempo limite",
        code: 504,
      });
    }
    return res.status(500).json({ msg: "Erro ao buscar produtos", code: 500 });
  }
}



export async function BuscarCategoriasController(req,res) {
  try {

    const categorias = await httpFetchTimeout(`${process.env.API_BASE_PRODUTOS}/products/categories`)


    return res.json({
      code: 200,
      msg: "Categorias buscadas com sucesso",
      categorias: categorias ? categorias : [],
    });
    
  } catch (error) {
    console.error("Erro ao buscar categorias:", error);
    if (error.name === "AbortError") {
      return res.status(504).json({
        msg: "A requisição para buscar categorias excedeu o tempo limite",
        code: 504,
      });
    }
    return res.status(500).json({ msg: "Erro ao buscar categorias", code: 500 });
  }
  
}