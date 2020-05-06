import * as Router from "koa-router";

import TargetModel from "../../models/order/target.model";
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
    ctx.body = targets;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await TargetModel.findOne({ where: { name: ctx.request.body.name } }).then(
    async (target) => {
      if (!target) {
        await TargetModel.create(ctx.request.body).then((target) => {
          ctx.body = cloneTarget(target);
        });
      } else {
        ctx.status = 400;
        ctx.body = { name: "Name already exists." };
      }
    }
  );
});

router.put("/:targetId", validationMiddleware(), async (ctx, next) => {
  await TargetModel.findOne({ where: { id: ctx.params.targetId } }).then(
    async (target) => {
      if (target) {
        await target.update(ctx.request.body).then((target) => {
          ctx.body = cloneTarget(target);
        });
      } else {
        ctx.status = 404;
        ctx.body = {};
      }
    }
  );
});

router.delete("/:targetId", async (ctx, next) => {
  await TargetModel.destroy({
    where: { id: ctx.params.targetId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
