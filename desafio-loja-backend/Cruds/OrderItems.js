import { OrderItems } from "../Models/OrderItems.js";

export async function cadastrarItemsPedidosBulk(pedidosDataArray) {
    return await OrderItems.bulkCreate(pedidosDataArray);
    
}