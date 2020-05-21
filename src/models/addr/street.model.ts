import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/mariadb";
import Area from "./area.model";
export default class Street extends Model {
  id: string;
  name: string;
}

Street.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    areaId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "streets",
  }
);
Street.belongsTo(Area, { foreignKey: "areaId" });
// Street.sync({ force: true });
