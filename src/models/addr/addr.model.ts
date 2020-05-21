import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/mariadb";
import Street from "./street.model";
export default class Addr extends Model {
  id: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  name: string;
  addr: string;
  tel: string;
  type: string;
  streetId: string;
}

Addr.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addr: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "addrs",
  }
);
Addr.belongsTo(Street, { foreignKey: "streetId" });
// Addr.sync({ force: true });
