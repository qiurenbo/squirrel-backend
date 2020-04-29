"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const router = new Router();
router.get("/", async (ctx, next) => {
    // const jane = await OrderModel.create({
    //   id: "1",
    //   name: "Doe",
    //   addr: "dsd",
    //   tel: "dsd",
    //   type: "ds",
    // });
    // ctx.body = { jane };
});
exports.default = router;
//# sourceMappingURL=order.router.js.map