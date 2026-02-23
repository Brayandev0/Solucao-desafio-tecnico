import Express from "express";
import { BuscarCategoriasController, BuscarProdutosController, BuscarProdutosPorIdController } from "../Controllers/Products.js";
import { BuscarProdutosPorIdMiddleware, BuscarProdutosMiddleware } from "../Middlewares/Products.js";

const produtosRoute = Express.Router();

produtosRoute.get("/",BuscarProdutosMiddleware,BuscarProdutosController)
produtosRoute.get("/categories/",BuscarCategoriasController)
produtosRoute.get("/:id",BuscarProdutosPorIdMiddleware,BuscarProdutosPorIdController)



export default produtosRoute;   