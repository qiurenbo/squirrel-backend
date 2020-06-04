import { Model, DataTypes } from "sequelize";
import Addr from "../addr/addr.model";
import sequelize from "../../config/mariadb";
import Operator from "../operator.model";
import Status from "./status.model";
class Project extends Model {
  id: string;
  name: string;
  date: string;
  addrId: string;
  operatorId: string;
  statusId: string;
  remarks: string;
}

Project.init(
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
    tableName: "projects",
  }
);
Project.belongsTo(Addr, { foreignKey: "addrId" });
Project.belongsTo(Operator, { foreignKey: "operatorId" });
Project.belongsTo(Status, { foreignKey: "statusId" });
export default Project;
