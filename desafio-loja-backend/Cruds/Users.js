import { Orders } from "../Models/Orders.js";
import { Users } from "../Models/Users.js";
import { geraruuid } from "../Utils/generator.js";

export async function BuscarUserPorEmail(email) {
  return await Users.findOne({ where: { email: email } });
}

export async function cadastrarUsers(email, nome, senha) {
  return await Users.create({
    uuid: await geraruuid(),
    email: email,
    name: nome,
    password: senha,
  });
}

export async function BuscarPerfilComPedidosUsers(uuid) {
  return await Users.findOne({
    where: { uuid: uuid },
    attributes: { exclude: ["password","uuid"] },
    include: [
      {
        model: Orders,
        as: "UserOrders",
        attributes: { exclude: ["user_uuid"] }
      },
    ],
  });
}
