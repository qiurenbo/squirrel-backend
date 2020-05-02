"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const addr_model_1 = require("../models/addr.model");
const router = new Router();
const validationMiddleware = () => {
    return async (ctx, next) => {
        if (!ctx.request.body.name ||
            !ctx.request.body.addr ||
            !ctx.request.body.tel ||
            !ctx.request.body.type) {
            ctx.status = 400;
            ctx.body = {};
            if (!ctx.request.body.name) {
                ctx.body.name = "Name is required.";
            }
            if (!ctx.request.body.addr) {
                ctx.body.addr = "Addr is required.";
            }
            if (!ctx.request.body.tel) {
                ctx.body.tel = "Tel is required.";
            }
            if (!ctx.request.body.type) {
                ctx.body.type = "Type is required.";
            }
            return;
        }
        await next();
    };
};
router.get("/", async (ctx, next) => {
    await addr_model_1.default.findAll().then((addrs) => {
        ctx.body = addrs;
    });
});
router.post("/", validationMiddleware(), async (ctx, next) => {
    await addr_model_1.default.findOne({ where: { name: ctx.request.body.name } }).then(async (addr) => {
        if (!addr) {
            await addr_model_1.default.create(ctx.request.body).then((addr) => {
                ctx.body = addr;
            });
        }
        else {
            ctx.status = 400;
            ctx.body = { name: "Name already exists." };
        }
    });
});
router.put("/:addrId", validationMiddleware(), async (ctx, next) => {
    await addr_model_1.default.findOne({ where: { id: ctx.params.addrId } }).then(async (addr) => {
        if (addr) {
            await addr.update(ctx.request.body).then((addr) => {
                ctx.body = addr;
            });
        }
        else {
            ctx.status = 404;
            ctx.body = {};
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