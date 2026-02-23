import { Users } from "./Users.js";
import { Orders } from "./Orders.js";
import { OrderItems } from "./OrderItems.js";

Users.hasMany(Orders, {
  foreignKey: "user_uuid",
  as: "UserOrders",
});

Orders.belongsTo(Users, {
  foreignKey: "user_uuid",
  as: "OrderUsers",
});

Orders.hasMany(OrderItems, {
  foreignKey: "order_uuid",
  as: "OrderItems",
});

OrderItems.belongsTo(Orders, {
  foreignKey: "order_uuid",
  as: "ItemOrders",
});