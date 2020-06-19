import { Model, DataTypes } from "sequelize";
import sequelize from "../../config/mariadb";
export default class Purchase extends Model {
  id: string; // ⇨ uuid'9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
  date: string;
  projectName: string;
  productName: string;
  unitPrice: number;
  number: number;
  totalPrice: number;
  source: string;
  stock: number;
  remarks: string;
}

Purchase.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    date: {
      type: DataTypes.STRING,
    },
    projectName: {
      type: DataTypes.STRING,
    },
    productName: {
      type: DataTypes.STRING,
    },
    unitPrice: {
      type: DataTypes.FLOAT,
    },
    number: {
      type: DataTypes.INTEGER,
    },
    stock: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
    },
    source: {
      type: DataTypes.STRING,
    },
    remarks: {
      type: DataTypes.TEXT,
    },

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
    tableName: "purchases",
  }
);
// Purchase.sync({ force: true });
