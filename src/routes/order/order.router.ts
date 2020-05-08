import * as Router from "koa-router";
import OrderModel from "models/order/order.model";
import Addr from "models/addr.model";
import Malfunction from "models/order/malfunction.model";
import Target from "models/order/target.model";
import Action from "models/order/action.model";
import Operator from "models/operator.model";
import { ForeignKeyConstraintError, UniqueConstraintError } from "sequelize";
const router = new Router();

// Sequelize default use UTC time
const cloneOrder = (order: OrderModel) => {
  return {
    id: order.id,
    date: order.date,
    addrId: order.addrId,
    operatorId: order.operatorId,
    actionId: order.actionId,
    targetId: order.targetId,
    malfunctionId: order.malfunctionId,
  };
};

const validationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (
      !ctx.request.body.date ||
      !ctx.request.body.addrId ||
      !ctx.request.body.operatorId ||
      !ctx.request.body.actionId ||
      !ctx.request.body.targetId ||
      !ctx.request.body.malfunctionId
    ) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.date) {
        ctx.body.date = "Date is required.";
      }

      if (!ctx.request.body.addrId) {
        ctx.body.addrId = "AddrId is required.";
      }

      if (!ctx.request.body.operatorId) {
        ctx.body.operatorId = "OperatorId is required.";
      }

      if (!ctx.request.body.actionId) {
        ctx.body.actionId = "ActionId is required.";
      }

      if (!ctx.request.body.targetId) {
        ctx.body.targetId = "TargetId is required.";
      }

      if (!ctx.request.body.malfunctionId) {
        ctx.body.malfunctionId = "MalfunctionId is required.";
      }
      return;
    }

    await next();
  };
};

router.get("/", async (ctx, next) => {
  await OrderModel.findAll({
    where: {},
    include: [Addr, Malfunction, Target, Action, Operator],
  }).then((orders) => {
    ctx.set("X-Total-Count", orders.length + "");
    ctx.body = orders;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await OrderModel.create(ctx.request.body)
    .then((order) => {
      ctx.body = cloneOrder(order);
    })
    .catch((error) => {
      if (error instanceof ForeignKeyConstraintError) {
        ctx.status = 400;
        ctx.body = { error: "ForeignKey doesn't exist." };
      }
    });
});

router.put("/:orderId", validationMiddleware(), async (ctx, next) => {
  await OrderModel.update(ctx.request.body, {
    where: { id: ctx.params.orderId },
  })
    .then((rows) => {
      //if rows effected
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.orderId;
        ctx.body = cloneOrder(ctx.request.body);
      } else {
        ctx.status = 404;
        ctx.body = { error: "Id doesn't exists." };
      }
    })
    .catch((error) => {
      if (error instanceof ForeignKeyConstraintError) {
        ctx.status = 400;
        ctx.body = { error: "ForeignKey doesn't exist." };
      }
    });
});

router.delete("/:orderId", async (ctx, next) => {
  await OrderModel.destroy({
    where: { id: ctx.params.orderId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
