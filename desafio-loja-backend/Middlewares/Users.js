import { config } from "dotenv";
import { buscarPedidoPorUuid } from "../Cruds/Orders.js";
import { BuscarUserPorEmail } from "../Cruds/Users.js";
import { criptografarDados, verificarSenhaHash } from "../Utils/encrypt.js";
import { geraruuid } from "../Utils/generator.js";
import { httpFetchTimeout } from "../Utils/httpClient.js";
import { mapearPedido } from "../Utils/mapeadorData.js";
import { validarEmail, validarUuidV4 } from "../Utils/validators.js";
config();

export async function realizarLoginMiddleware(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Email e senha são obrigatórios", code: 400 });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ msg: "Email inválido", code: 400 });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          msg: "A senha deve conter pelo menos 6 caracteres",
          code: 400,
        });
    }
    const userData = await BuscarUserPorEmail(email);
    if (!userData) {
      return res
        .status(401)
        .json({ msg: "Email ou senha incorretos", code: 401 });
    }
    if (!await verificarSenhaHash(userData.password, password)) {
      return res
        .status(401)
        .json({ msg: "Email ou senha incorretos", code: 401 });
    }
    req.uuid = userData.uuid;
    next();
  } catch (error) {
    console.error("Erro no realizarLoginMiddleware:", error);
    return res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
}

export async function realizarCadastroMiddleware(req, res, next) {
  try {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ msg: "Email, name e password são obrigatórios", code: 400 });
    }

    if (!validarEmail(email)) {
      return res.status(400).json({ msg: "Email inválido", code: 400 });
    }
    if (!name || name.length < 2 || name.length > 60) {
      return res.status(400).json({ msg: "O name é obrigatório", code: 400 });
    }
    if (password.length < 6) {
      return res
        .status(400)
        .json({
          msg: "A senha deve conter pelo menos 6 caracteres",
          code: 400,
        });
    }
    const [userData, senhaHash] = await Promise.all([
      BuscarUserPorEmail(email),
      criptografarDados(password),
    ]);
    if (userData) {
      return res
        .status(409)
        .json({
          msg: "Já existe uma conta cadastrada com esse email",
          code: 409,
        });
    }
    req.senhaHash = senhaHash;
    next();
  } catch (error) {
    console.error("Erro no realizarCadastroMiddleware:", error);
    return res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
}

export async function cadastrarPedidoMiddleware(req,res,next) {
  try {
    let valorTotal = 0;
      const { endereco, pagamento, produtos } = req.body;
      if (!endereco || !pagamento || !produtos) {
        return res
          .status(400)
          .json({ msg: "Endereço, pagamento e produtos são obrigatórios", code: 400 });
      }
      if(endereco.length < 3 || endereco.length > 200){
        return res
          .status(400)
          .json({ msg: "O endereço e invalido", code: 400 });
      }
      if(!["pix", "cartao", "boleto"].includes(pagamento.toLowerCase())){
        return res
          .status(400)
          .json({ msg: "O método de pagamento deve ser 'pix', 'cartao' ou 'boleto'", code: 400 });
      }
      if(!Array.isArray(produtos) || produtos.length === 0){
        return res
          .status(400)
          .json({ msg: "A lista de produtos não pode estar vazia", code: 400 });
      }


    for (const produto of produtos) {
      if (
        !produto.id ||
        !produto.quantidade ||
        !Number.isFinite(Number(produto.id)) ||
        !Number.isFinite(Number(produto.quantidade))
      ) {
        return res.status(400).json({
          msg: "Cada produto deve ter id e quantidade válidos",
          code: 400,
        });
      }
    }

    // fetch em paralelo para maior velocidade
    const requests = produtos.map((produto) =>
      httpFetchTimeout(
        `${process.env.API_BASE_PRODUTOS}/products/${produto.id}?select=id,title,thumbnail,price`,
      ),
    );

    const responses = await Promise.all(requests);
    const OrderUuid = await geraruuid();

    const produtosData = responses.map((apiData, index) => {
      if (!apiData || !apiData.id) {
        throw new Error(`Produto com id ${produtos[index].id} não encontrado`);
      }
      valorTotal += (apiData.price * 5.50) * produtos[index].quantidade
      return {
        name: apiData.title,
        image: apiData.thumbnail,
        order_uuid: OrderUuid,
        price: (apiData.price * 5.50).toFixed(2),
        quantity: produtos[index].quantidade,
        product_id: apiData.id,
      };
    });


    req.produtosData = produtosData;
    req.valorTotal = valorTotal.toFixed(2);
    req.OrderUuid = OrderUuid;
    next();
  } catch (error) {
    console.error("Erro no realizarPedidoCadastroMiddleware:", error);
    if(error.status === 404){
      return res.status(404).json({ msg: "Um ou mais produtos não foram encontrados", code: 404 });
    }
    return res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
  
}

export async function verPedidosPorUuidMiddleware(req,res,next) {
  try {
    const {uuid} = req.params;
    if(!uuid || !validarUuidV4(uuid)){
      return res.status(400).json({ msg: "O uuid do pedido é inválido", code: 400 });
    }

    let pedido = await buscarPedidoPorUuid(req.uuid, uuid);
    if(!pedido){
      return res.status(404).json({ msg: "Pedido não encontrado", code: 404 });
    }
    pedido = mapearPedido(pedido) // mapeia os dados do pedido para o formato esperado pela resposta da API

    req.pedidoData = pedido

    next();
  } catch (error) {
    console.error("Erro no verPedidosPorUuidMiddleware:", error);
    return res.status(500).json({ msg: "Erro interno no servidor", code: 500 });
  }
  
}