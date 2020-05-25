import { Model, DataTypes } from "sequelize";
import sequelize from "../../../config/mariadb";

class MajorTargetType extends Model {
  id: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  name: string; // YYYMMDD
}

MajorTargetType.init(
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
  },
  {
    sequelize,
    tableName: "majorTargetTypes",
  }
);

export default MajorTargetType;
