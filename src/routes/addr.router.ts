import * as Router from "koa-router";

import AddrModel from "../models/addr.model";
const router = new Router();

// Sequelize default use UTC time
const cloneAddr = (addr: AddrModel) => {
  return {
    id: addr.id,
    name: addr.name,
    addr: addr.addr,
    tel: addr.tel,
    type: addr.type,
  };
};

const validationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (
      !ctx.request.body.name ||
      !ctx.request.body.addr ||
      !ctx.request.body.tel ||
      !ctx.request.body.type
    ) {
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
  await AddrModel.findAll().then((addrs) => {
    ctx.body = addrs;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await AddrModel.findOne({ where: { name: ctx.request.body.name } }).then(
    async (addr) => {
      if (!addr) {
        await AddrModel.create(ctx.request.body).then((addr) => {
          ctx.body = cloneAddr(addr);
        });
      } else {
        ctx.status = 400;
        ctx.body = { name: "Name already exists." };
      }
    }
  );
});

router.put("/:addrId", validationMiddleware(), async (ctx, next) => {
  await AddrModel.findOne({ where: { id: ctx.params.addrId } }).then(
    async (addr) => {
      if (addr) {
        await addr.update(ctx.request.body).then((addr) => {
          ctx.body = cloneAddr(addr);
        });
      } else {
        ctx.status = 404;
        ctx.body = {};
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
