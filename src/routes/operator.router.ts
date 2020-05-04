import * as Router from "koa-router";

import OperatorModel from "../models/operator.model";
const router = new Router();

// Sequelize default use UTC time
const cloneOperator = (operator: OperatorModel) => {
  return {
    id: operator.id,
    name: operator.name,
    tel: operator.tel,
    department: operator.department,
  };
};

const validationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (
      !ctx.request.body.name ||
      !ctx.request.body.tel ||
      !ctx.request.body.department
    ) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.name) {
        ctx.body.name = "Name is required.";
      }

      if (!ctx.request.body.tel) {
        ctx.body.tel = "Tel is required.";
      }

      if (!ctx.request.body.department) {
        ctx.body.department = "Department is required.";
      }

      return;
    }

    await next();
  };
};

router.get("/", async (ctx, next) => {
  await OperatorModel.findAll().then((operators) => {
    ctx.body = operators;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await OperatorModel.findOne({ where: { name: ctx.request.body.name } }).then(
    async (operator) => {
      if (!operator) {
        await OperatorModel.create(ctx.request.body).then((operator) => {
          ctx.body = cloneOperator(operator);
        });
      } else {
        ctx.status = 400;
        ctx.body = { name: "Name already exists." };
      }
    }
  );
});

router.put("/:operatorId", validationMiddleware(), async (ctx, next) => {
  await OperatorModel.findOne({ where: { id: ctx.params.operatorId } }).then(
    async (operator) => {
      if (operator) {
        await operator.update(ctx.request.body).then((operator) => {
          ctx.body = cloneOperator(operator);
        });
      } else {
        ctx.status = 404;
        ctx.body = {};
      }
    }
  );
});

router.delete("/:operatorId", async (ctx, next) => {
  await OperatorModel.destroy({
    where: { id: ctx.params.operatorId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
