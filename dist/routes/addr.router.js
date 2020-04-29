"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const addr_model_1 = require("../models/addr.model");
const router = new Router();
router.get("/", async (ctx, next) => {
    await addr_model_1.default.findAll().then((addrs) => {
        ctx.body = addrs;
    });
});
router.post("/", async (ctx, next) => {
    await addr_model_1.default.create(ctx.request.body).then((addr) => {
        ctx.body = addr;
    });
});
router.put("/:addrId", async (ctx, next) => {
    await addr_model_1.default.findOne({ where: { id: ctx.params.addrId } }).then(async (addr) => {
        if (addr) {
            await addr.update(ctx.request.body).then((addr) => {
                ctx.body = addr;
            });
        }
    });
});
router.delete("/:addrId", async (ctx, next) => {
    await addr_model_1.default.destroy({
        where: { id: ctx.params.addrId },
    }).then(() => {
        ctx.body = {};
    });
});
exports.default = router;
//# sourceMappingURL=addr.router.js.map