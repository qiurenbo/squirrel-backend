import * as Router from "koa-router";
import StatusModel from "../../models/order/status.model";
import { UniqueConstraintError } from "sequelize";
const router = new Router();

// Sequelize default use UTC time
const cloneStatus = (status: StatusModel) => {
  return {
    id: status.id,
    name: status.name,
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
  await StatusModel.findAll().then((statuss) => {
    ctx.set("X-Total-Count", statuss.length + "");
  });
  await StatusModel.findAll(ctx.query.pagination).then((statuss) => {
    ctx.body = statuss;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await StatusModel.create(ctx.request.body)
    .then((status) => {
      ctx.body = cloneStatus(status);
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = { error: "Name already exists." };
      }
    });
});

router.put("/:statusId", validationMiddleware(), async (ctx, next) => {
  await StatusModel.update(ctx.request.body, {
    where: { id: ctx.params.statusId },
  })
    //https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
    .then((rows) => {
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.statusId;
        ctx.body = cloneStatus(ctx.request.body);
      } else {
        ctx.status = 404;
        ctx.body = { error: "Id doesn't exist." };
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = { error: "Name already exists." };
      }
    });
});

router.delete("/:statusId", async (ctx, next) => {
  await StatusModel.destroy({
    where: { id: ctx.params.statusId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
