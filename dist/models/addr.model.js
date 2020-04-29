"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const mariadb_1 = require("../config/mariadb");
class Addr extends sequelize_1.Model {
}
exports.default = Addr;
Addr.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
    },
    addr: {
        type: sequelize_1.DataTypes.STRING,
    },
    tel: {
        type: sequelize_1.DataTypes.STRING,
    },
    type: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: mariadb_1.default,
    tableName: "addr",
});
Addr.sync({ force: true });
//# sourceMappingURL=addr.model.js.map