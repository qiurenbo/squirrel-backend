import * as Router from "koa-router";
import Addr from "../models/addr/addr.model";
import { UniqueConstraintError } from "sequelize";
import Street from "src/models/addr/street.model";
import Area from "src/models/addr/area.model";
const router = new Router();

// Sequelize default use UTC time
const cloneAddr = (addr: Addr) => {
  return {
    id: addr.id,
    name: addr.name,
    addr: addr.addr,
    tel: addr.tel,
    type: addr.type,
    streetId: addr.streetId,
  };
};

const validationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (
      !ctx.request.body.name ||
      !ctx.request.body.addr ||
      !ctx.request.body.tel ||
      !ctx.request.body.type ||
      !ctx.request.body.streetId
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

      if (!ctx.request.body.streetId) {
        ctx.body.streetId = "Street ID is required.";
      }

      return;
    }

    await next();
  };
};

router.get("/", async (ctx, next) => {
  let query = ctx.query.pagination;
  query.include = [{ model: Street, include: [{ model: Area }] }];

  await Addr.findAll(query).then((addrs) => {
    ctx.body = addrs;
  });

  await Addr.findAll().then((addrs) => {
    ctx.set("X-Total-Count", addrs.length + "");
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await Addr.create(ctx.request.body)
    .then((addr) => {
      ctx.body = cloneAddr(addr);
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = {};
        ctx.body.error = "Addr already exists.";
      }
    });
});

router.put("/:addrId", validationMiddleware(), async (ctx, next) => {
  await Addr.update(ctx.request.body, {
    where: { id: ctx.params.addrId },
  })
    .then((rows) => {
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.addrId;
        ctx.body = cloneAddr(ctx.request.body);
      } else {
        ctx.status = 404;
        ctx.body = { error: "Addr doesn't exist." };
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = { error: "Addr already exists." };
      }
    });
});

router.delete("/:addrId", async (ctx, next) => {
  await Addr.destroy({
    where: { id: ctx.params.addrId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
