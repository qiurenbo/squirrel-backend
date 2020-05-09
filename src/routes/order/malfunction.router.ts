import * as Router from "koa-router";
import MalfunctionModel from "models/order/malfunction.model";
import { UniqueConstraintError } from "sequelize";
const router = new Router();

// Sequelize default use UTC time
const cloneMalfunction = (malfunction: MalfunctionModel) => {
  return {
    id: malfunction.id,
    name: malfunction.name,
  };
};

const validationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (!ctx.request.body.name) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.name) {
        ctx.body.name = "Name is required.";
      }

      return;
    }

    await next();
  };
};

router.get("/", async (ctx, next) => {
  await MalfunctionModel.findAll().then((malfunctions: any) => {
    ctx.set("X-Total-Count", malfunctions.length + "");
  });
  await MalfunctionModel.findAll(ctx.query.pagination).then(
    (malfunctions: any) => {
      ctx.body = malfunctions;
    }
  );
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await MalfunctionModel.create(ctx.request.body)
    .then((malfunction: any) => {
      ctx.body = cloneMalfunction(malfunction);
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = { error: "Name already exists." };
      }
    });
});

router.put("/:malfunctionId", validationMiddleware(), async (ctx, next) => {
  await MalfunctionModel.update(ctx.request.body, {
    where: { id: ctx.params.malfunctionId },
  })
    .then((rows) => {
      // if rows effected
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.malfunctionId;
        ctx.body = cloneMalfunction(ctx.request.body);
      } else {
        ctx.status = 404;
        ctx.body = { error: "Id doesn't exist." };
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.body = { error: "Name already exists." };
        ctx.status = 409;
      }
    });
});

router.delete("/:malfunctionId", async (ctx, next) => {
  await MalfunctionModel.destroy({
    where: { id: ctx.params.malfunctionId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
