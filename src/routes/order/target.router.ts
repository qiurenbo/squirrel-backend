import * as Router from "koa-router";

import TargetModel from "models/order/target.model";
import { UniqueConstraintError } from "sequelize";
const router = new Router();

// Sequelize default use UTC time
const cloneTarget = (target: TargetModel) => {
  return {
    id: target.id,
    name: target.name,
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
  await TargetModel.findAll().then((targets) => {
    ctx.set("X-Total-Count", targets.length + "");
    ctx.body = targets;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await TargetModel.create(ctx.request.body)
    .then((target) => {
      ctx.body = cloneTarget(target);
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.body = { error: "Name already exists." };
        ctx.status = 409;
      }
    });
});

router.put("/:targetId", validationMiddleware(), async (ctx, next) => {
  await TargetModel.update(ctx.request.body, {
    where: { id: ctx.params.targetId },
  })
    .then((rows) => {
      // If one rows effected
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.targetId;
        ctx.body = cloneTarget(ctx.request.body);
      } else {
        ctx.body = { error: "Id doesn't exist." };
        ctx.status = 404;
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.body = { error: "Name already exists." };
        ctx.status = 409;
      }
    });
});

router.delete("/:targetId", async (ctx, next) => {
  await TargetModel.destroy({
    where: { id: ctx.params.targetId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
