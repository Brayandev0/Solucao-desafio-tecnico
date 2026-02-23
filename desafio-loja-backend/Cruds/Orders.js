import { OrderItems } from "../Models/OrderItems.js";
import { Orders } from "../Models/Orders.js";

export async function cadastrarPedidos(
  orderUuid,
  endereco,
  pagamento,
  valorTotal,
  userUuid,
  status,
) {
  return await Orders.create({
    uuid: orderUuid,
    user_uuid: userUuid,
    address: endereco,
    payment_method: pagamento,
    amount: valorTotal,
    status: status,
  });
}



export async function buscarPedidoPorUuid(uuidUser, uuidPedido) {
  return await Orders.findOne({
    where: { user_uuid: uuidUser, uuid: uuidPedido },
    attributes: { exclude: ["user_uuid"] },
    include: [
      {
        model: OrderItems,
        as: "OrderItems",
        attributes: { exclude: ["order_uuid"] },
      },
    ],
  });
}
