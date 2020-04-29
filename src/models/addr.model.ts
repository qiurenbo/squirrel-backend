import { Model, DataTypes } from "sequelize";
import sequelize from "../config/mariadb";
export default class Addr extends Model {
  id!: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  name!: string;
  addr!: string;
  tel!: string;
  type!: string;
}

Addr.init(
  {
    id: {
      type: DataTypes.STRING, // you can omit the `new` but this is discouraged
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING, // you can omit the `new` but this is discouraged
    },
    addr: {
      type: DataTypes.STRING, // you can omit the `new` but this is discouraged
    },
    tel: {
      type: DataTypes.STRING, // you can omit the `new` but this is discouraged
    },
    type: {
      type: DataTypes.STRING, // you can omit the `new` but this is discouraged
    },
  },

  {
    sequelize,
    tableName: "addr",
  }
);

Addr.sync({ force: true });
