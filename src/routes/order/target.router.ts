import * as Router from "koa-router";

import TargetModel from "../../models/order/target/target.model";
import { UniqueConstraintError, ForeignKeyConstraintError } from "sequelize";
import MinorTargetType from "../../models/order/target/minor-target-type.model";
import MajorTargetType from "../../models/order/target/major-target-type.model";
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
    if (!ctx.request.body.name || !ctx.request.body.minorTargetTypeId) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.name) {
        ctx.body.name = "Name is required.";
      }
      if (!ctx.request.body.minorTargetTypeId) {
        ctx.body.name = "MinorTargetTypeId is required.";
      }
      return;
    }

    await next();
  };
};

router.get("/", async (ctx, next) => {
  await TargetModel.findAll().then((targets) => {
    ctx.set("X-Total-Count", targets.length + "");
  });
  let query = ctx.query.pagination;
  query.include = [{ model: MinorTargetType, include: [MajorTargetType] }];
  await TargetModel.findAll(query).then((targets) => {
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
      } else if (error instanceof ForeignKeyConstraintError) {
        ctx.status = 409;
        ctx.body = { error: "MinorTargetId error." };
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
