export async function BuscarProdutosMiddleware(req, res, next) {
  try {
    const order = req.query.order;
    const sortBy = req.query.sortBy;
    const categoria = req.query.categories;
    const limit = req.query.limit;
    const start = req.query.start;
    let UrlBase = `${process.env.API_BASE_PRODUTOS}/products`;

    if (categoria) {
      if (categoria.length < 3 || categoria.length > 50) {
        return res.status(400).json({
          msg: "Parâmetro 'categoria' inválido.",
          code: 400,
        });
      }

      UrlBase += `/category/${categoria}`;
    }

    const queryUrl = new URLSearchParams();

    queryUrl.append("select", "id,stock,title,price,thumbnail,description");

    if (order) {
      if (!["asc", "desc"].includes(order.toLowerCase())) {
        return res.status(400).json({
          msg: "Parâmetro 'order' inválido.",
          code: 400,
        });
      }

      queryUrl.append("order", order);
    }

    if (limit) {
      if (!Number.isFinite(Number(limit)) || parseInt(limit) < 1) {
        return res.status(400).json({
          msg: "Parâmetro 'limite' inválido.",
          code: 400,
        });
      }
      queryUrl.append("limit", limit);
    }

    if (sortBy) {
      if (!["price", "title"].includes(sortBy.toLowerCase())) {
        return res.status(400).json({
          msg: "Parâmetro 'sortBy' inválido.",
          code: 400,
        });
      }

      queryUrl.append("sortBy", sortBy);
    }
    if (start) {
      if (!Number.isFinite(Number(start)) || parseInt(start) < 0) {
        return res.status(400).json({
          msg: "Parâmetro 'start' inválido.",
          code: 400,
        });
      }
      queryUrl.append("skip", start);
    }

    UrlBase += `?${queryUrl.toString()}`;

    req.urlBase = UrlBase;
    next();
  } catch (error) {
    console.error("Erro no middleware:", error);
    return res.status(500).json({
      msg: "Erro no middleware de busca de produtos",
      code: 500,
    });
  }
}

export async function BuscarProdutosPorIdMiddleware(req, res, next) {
  try {
    const id = req.params.id;

    if (!id || !Number.isFinite(Number(id)) || parseInt(id) < 0) {
      return res.status(400).json({
        msg: "Parâmetro 'id' inválido.",
        code: 400,
      });
    }
    const UrlBase = `${process.env.API_BASE_PRODUTOS}/products/${id}`;
    req.urlBase = UrlBase;
    next();
  } catch (error) {
    console.error("Erro ao buscar produto por ID:", error);
    return res.status(500).json({
      msg: "Erro ao buscar produto por ID",
      code: 500,
    });
  }
}
