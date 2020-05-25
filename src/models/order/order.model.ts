import { Model, DataTypes } from "sequelize";
import Addr from "../addr/addr.model";
import sequelize from "../../config/mariadb";
import Malfunction from "./malfunction.model";
import Target from "./target/target.model";
import Action from "./action.model";
import Operator from "../operator.model";
import Status from "./status.model";
class Order extends Model {
  id: string;
  date: string;
  addrId: string;
  operatorId: string;
  targetId: string;
  actionId: string;
  malfunctionId: string;
  statusId: string;
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
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
    actionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    targetId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    malfunctionId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    remarks: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    statusId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);
Order.belongsTo(Malfunction, { foreignKey: "malfunctionId" });
Order.belongsTo(Target, { foreignKey: "targetId" });
Order.belongsTo(Action, { foreignKey: "actionId" });
Order.belongsTo(Addr, { foreignKey: "addrId" });
Order.belongsTo(Operator, { foreignKey: "operatorId" });
Order.belongsTo(Status, { foreignKey: "statusId" });
export default Order;
