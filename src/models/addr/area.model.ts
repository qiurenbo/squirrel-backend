import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/mariadb";
export default class Area extends Model {
  id: string;
  name: string;
}

Area.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },

  {
    sequelize,
    tableName: "areas",
  }
);

// Area.sync({ force: true });
