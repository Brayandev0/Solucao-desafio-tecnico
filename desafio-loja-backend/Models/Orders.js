import { DataTypes } from "sequelize";
import { db } from "./Database.js";

export const Orders = db.define(
  "Orders",
  {
    uuid: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: "uuid_Orders",
      allowNull: false,
    },

    user_uuid: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: "uuid_Users",
    },

    address: {
      type: DataTypes.STRING(150),
      allowNull: false,
      field: "address_Orders",
    },

    payment_method: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: "payment_method_Orders",
    },

    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      field: "amount_Orders",
    },

    status: {
      type: DataTypes.ENUM("pending", "approved", "refunded", "cancelled"),
      allowNull: false,
      defaultValue: "pending",
      field: "status_Orders",
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at_Orders",
    },
  },
  {
    tableName: "Orders",
    timestamps: false,
  },
);
