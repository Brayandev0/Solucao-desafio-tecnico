import { DataTypes } from "sequelize";
import { db } from "./Database.js";

export const OrderItems = db.define(
  "OrderItems",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: "id_OrderItems",
      allowNull: false,
      autoIncrement: true,
    },

    order_uuid: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: "uuid_Orders",
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "name_OrderItems",
    },

    image: {
      type: DataTypes.STRING(150),
      allowNull: true,
      field: "image_OrderItems",
    },

    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "price_OrderItems",
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "quantity_OrderItems",
    },

    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "product_id_OrderItems",
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at_OrderItems",
    },
  },
  {
    tableName: "OrderItems",
    timestamps: false,
  },
);
