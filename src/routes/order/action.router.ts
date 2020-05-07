import * as Router from "koa-router";
import ActionModel from "models/order/action.model";
import { UniqueConstraintError } from "sequelize";
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
  await ActionModel.create(ctx.request.body)
    .then((action) => {
      ctx.body = cloneAction(action);
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = { error: "Name already exists." };
      }
    });
});

router.put("/:actionId", validationMiddleware(), async (ctx, next) => {
  await ActionModel.update(ctx.request.body, {
    where: { id: ctx.params.actionId },
  })
    //https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
    .then((rows) => {
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.actionId;
        ctx.body = cloneAction(ctx.request.body);
      } else {
        ctx.status = 404;
        ctx.body = { error: "Id doesn't exist." };
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = { error: "Name alreay exists." };
      }
    });
});

router.delete("/:actionId", async (ctx, next) => {
  await ActionModel.destroy({
    where: { id: ctx.params.actionId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
