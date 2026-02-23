import Express from "express";
import { AuthMiddleware } from "../Middlewares/auth.js";
import { cadastrarPedidoMiddleware, realizarCadastroMiddleware, realizarLoginMiddleware, verPedidosPorUuidMiddleware,  } from "../Middlewares/Users.js";
import { cadastrarPedidoController, realizarCadastroController, realizarLoginController, verPedidosPorUuidController, verPerfilController } from "../Controllers/Users.js";

const UserRoute = Express.Router();

UserRoute.use(AuthMiddleware)

UserRoute.get("/",verPerfilController,)
UserRoute.get("/orders/:uuid",verPedidosPorUuidMiddleware,verPedidosPorUuidController)


UserRoute.post("/login",realizarLoginMiddleware,realizarLoginController)
UserRoute.post("/register",realizarCadastroMiddleware,realizarCadastroController)
UserRoute.post("/orders",cadastrarPedidoMiddleware,cadastrarPedidoController)

export default UserRoute;   