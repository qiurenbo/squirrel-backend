import * as Router from "koa-router";

import ActionModel from "../../models/order/action.model";
const router = new Router();

// Sequelize default use UTC time
const cloneAction = (action: ActionModel) => {
  return {
    id: action.id,
    name: action.name,
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
  await ActionModel.findAll().then((actions) => {
    ctx.body = actions;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await ActionModel.findOne({ where: { name: ctx.request.body.name } }).then(
    async (action) => {
      if (!action) {
        await ActionModel.create(ctx.request.body).then((action) => {
          ctx.body = cloneAction(action);
        });
      } else {
        ctx.status = 400;
        ctx.body = { name: "Name already exists." };
      }
    }
  );
});

router.put("/:actionId", validationMiddleware(), async (ctx, next) => {
  await ActionModel.findOne({ where: { id: ctx.params.actionId } }).then(
    async (action) => {
      if (action) {
        await action.update(ctx.request.body).then((action) => {
          ctx.body = cloneAction(action);
        });
      } else {
        ctx.status = 404;
        ctx.body = {};
      }
    }
  );
});

router.delete("/:actionId", async (ctx, next) => {
  await ActionModel.destroy({
    where: { id: ctx.params.actionId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
