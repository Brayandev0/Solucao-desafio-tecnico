import { DataTypes } from "sequelize";
import { db } from "./Database.js";

export const Users = db.define(
  "Users",
  {
    uuid: {
      type: DataTypes.STRING(36),
      primaryKey: true,
      field: "uuid_Users",
      allowNull: false,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: "name_Users",
    },

    email: {
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true,
      field: "email_Users",
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(250),
      allowNull: false,
      field: "password_Users",
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "created_at_Users",
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "Users",
    timestamps: false,
  },
);
