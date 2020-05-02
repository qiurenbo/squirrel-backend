"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mariadb_1 = require("../config/mariadb");
class Account extends sequelize_1.Model {
}
exports.default = Account;
Account.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: mariadb_1.default,
    tableName: "Account",
});
Account.sync({ force: true });
//# sourceMappingURL=Account.model.js.map