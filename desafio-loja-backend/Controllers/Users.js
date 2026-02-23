import { cadastrarItemsPedidosBulk } from "../Cruds/OrderItems.js";
import { buscarPedidoPorUuid, cadastrarPedidos } from "../Cruds/Orders.js";
import { BuscarPerfilComPedidosUsers, cadastrarUsers } from "../Cruds/Users.js";
import { gerarToken } from "../Utils/authToken.js";

export async function realizarLoginController(req, res) {
  try {
    const uuid = req.uuid;
    const token = await gerarToken(uuid);

    res
      .status(200)
      .json({ msg: "Login realizado com sucesso", code: 200, token: token });
  } catch (error) {
    console.error("Erro no realizarLoginController:", error);
    res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
}

export async function realizarCadastroController(req, res) {
  try {
    const { name, email } = req.body;
    const senhaHash = req.senhaHash;

    const cadastroData = await cadastrarUsers(email, name, senhaHash);
    const token = await gerarToken(cadastroData.uuid);

    res
      .status(201)
      .json({ msg: "Cadastro realizado com sucesso", code: 201, token: token });
  } catch (error) {
    console.error("Erro no realizarCadastroController:", error);
    res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
}

export async function cadastrarPedidoController(req, res) {
  try {
    const { endereco, pagamento } = req.body;
    const valorTotal = req.valorTotal;
    const orderUuid = req.OrderUuid;
    const produtosData = req.produtosData;

    // await cadastrarPedidosBulk(produtosData);
    await cadastrarPedidos(
      orderUuid,
      endereco,
      pagamento,
      valorTotal,
      req.uuid, // pega o uuid do jwt, que foi setado no AuthMiddleware
      "approved",
    );
    await cadastrarItemsPedidosBulk(produtosData);

    res.status(201).json({
      msg: "Seu pedido foi cadastrado com sucesso",
      code: 201,
      Valor: valorTotal,
      idPedido: orderUuid,
    });
  } catch (error) {
    console.error("Erro no realizarCadastroPedidoController:", error);
    res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
}

export async function verPerfilController(req, res) {
  try {
    const uuidUser = req.uuid;
    const UserInfo = await BuscarPerfilComPedidosUsers(uuidUser);

    res.status(200).json({
      msg: "Perfil encontrado com sucesso",
      code: 200,
      userInfo: UserInfo,
    });
  } catch (error) {
    console.error("Erro no verPerfilController:", error);
    res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
}

export async function verPedidosPorUuidController(req, res) {
  try {
    const pedidos = req.pedidoData; // pega os dados do pedido, que foram setados no verPedidosPorUuidMiddleware
    res.status(200).json({
      msg: "Pedido encontrado com sucesso",
      code: 200,
      pedidos: pedidos,
    });
  } catch (error) {
    console.error("Erro no verPedidosPorUuidController:", error);
    res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
}
