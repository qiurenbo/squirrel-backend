import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config/mariadb";
import MinorTargetType from "./minor-target-type.model";

class Target extends Model {
  id: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  name: string; // YYYMMDD
}

Target.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    minorTargetTypeId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "targets",
  }
);
Target.belongsTo(MinorTargetType, { foreignKey: "minorTargetTypeId" });
export default Target;
