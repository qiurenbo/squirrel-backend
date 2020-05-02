"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const addr_model_1 = require("./addr.model");
const mariadb_1 = require("../config/mariadb");
class Order extends sequelize_1.Model {
}
Order.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true,
    },
}, {
    sequelize: mariadb_1.default,
    tableName: "orders",
});
Order.belongsTo(addr_model_1.default);
exports.default = Order;
//# sourceMappingURL=order.model.js.map