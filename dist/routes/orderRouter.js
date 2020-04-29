"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get("/", (ctx, next) => {
    ctx.body = { error: "ok" };
});
exports.default = router.routes();
//# sourceMappingURL=orderRouter.js.map