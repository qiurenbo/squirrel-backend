"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const order_router_1 = require("./order.router");
const addr_router_1 = require("./addr.router");
const router = new Router({ prefix: "/api" });
router.use("/orders", order_router_1.default.routes());
router.use("/addrs", addr_router_1.default.routes());
exports.default = router;
//# sourceMappingURL=index.js.map