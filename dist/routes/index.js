"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const order_router_1 = require("./order.router");
const addr_router_1 = require("./addr.router");
const account_router_1 = require("./account.router");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
const router = new Router({ prefix: "/api" });
router.use("/orders", order_router_1.default.routes());
router.use("/addrs", jwt_middleware_1.default(), addr_router_1.default.routes());
router.use("/accounts", account_router_1.default.routes());
exports.default = router;
//# sourceMappingURL=index.js.map