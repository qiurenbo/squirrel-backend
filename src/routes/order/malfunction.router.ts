import * as Router from "koa-router";
import MalfunctionModel from "models/order/malfunction.model";
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
    ctx.body = malfunctions;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await MalfunctionModel.findOne({
    where: { name: ctx.request.body.name },
  }).then(async (malfunction: any) => {
    if (!malfunction) {
      await MalfunctionModel.create(ctx.request.body).then(
        (malfunction: any) => {
          ctx.body = cloneMalfunction(malfunction);
        }
      );
    } else {
      ctx.status = 400;
      ctx.body = { error: "Name already exists." };
    }
  });
});

router.put("/:malfunctionId", validationMiddleware(), async (ctx, next) => {
  await MalfunctionModel.findOne({
    where: { id: ctx.params.malfunctionId },
  }).then(async (malfunction: any) => {
    if (malfunction) {
      await malfunction.update(ctx.request.body).then((malfunction: any) => {
        ctx.body = cloneMalfunction(malfunction);
      });
    } else {
      ctx.status = 404;
      ctx.body = {};
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
