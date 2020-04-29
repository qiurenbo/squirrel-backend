import * as Router from "koa-router";

import AddrModel from "../models/addr.model";
const router = new Router();

router.get("/", async (ctx, next) => {
  await AddrModel.findAll().then((addrs) => {
    ctx.body = addrs;
  });
});

router.post("/", async (ctx, next) => {
  await AddrModel.create(ctx.request.body).then((addr) => {
    ctx.body = addr;
  });
});

router.put("/:addrId", async (ctx, next) => {
  await AddrModel.findOne({ where: { id: ctx.params.addrId } }).then(
    async (addr) => {
      if (addr) {
        await addr.update(ctx.request.body).then((addr) => {
          ctx.body = addr;
        });
      }
    }
  );
});

router.delete("/:addrId", async (ctx, next) => {
  await AddrModel.destroy({
    where: { id: ctx.params.addrId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
