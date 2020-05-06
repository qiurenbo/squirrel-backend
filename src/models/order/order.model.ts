import { Model, DataTypes } from "sequelize";
import Addr from "../addr.model";
import sequelize from "../../config/mariadb";

class Order extends Model {
  id: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  date: string; // YYYMMDD
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
      type: DataTypes.STRING,
      allowNull: false,
    },
    operatorId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    actionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    targetId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    malfunctionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "orders",
  }
);

Order.belongsTo(Addr);
export default Order;
