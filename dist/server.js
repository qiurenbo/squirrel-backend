"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const routes_1 = require("./routes");
const mariadb_1 = require("./config/mariadb");
mariadb_1.default
    .query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`)
    .then(() => {
    console.log("Database created");
    const app = new Koa();
    app.use(bodyparser());
    app.use(routes_1.default.routes());
    app.listen(3000);
    mariadb_1.default
        .authenticate()
        .then(() => {
        console.log("Connection has been established successfully.");
    })
        .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
    console.log("Server running on port 3000");
});
//# sourceMappingURL=server.js.map