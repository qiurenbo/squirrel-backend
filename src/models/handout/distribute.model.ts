import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/mariadb";
import Purchase from "./purchase.model";
import Addr from "../addr/addr.model";
import Operator from "../operator.model";
export default class Distribute extends Model {
  id: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  date: string;
  number: number;
  purchaseId: string;
  addrId: string;
  operatorId: string;
  receiver: string;
  remarks: string;
}

Distribute.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    purchaseId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    addrId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    operatorId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    receiver: { type: DataTypes.STRING },
    remarks: { type: DataTypes.STRING },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },

  {
    sequelize,
    tableName: "distributes",
  }
);
// Distribute.sync({ force: true });
Distribute.belongsTo(Purchase, { foreignKey: "purchaseId" });
Distribute.belongsTo(Addr, { foreignKey: "addrId" });
Distribute.belongsTo(Operator, { foreignKey: "operatorId" });
