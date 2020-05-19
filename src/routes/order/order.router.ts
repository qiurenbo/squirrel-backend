import * as Router from "koa-router";
import OrderModel from "../../models/order/order.model";
import Addr from "../../models/addr.model";
import Malfunction from "../../models/order/malfunction.model";
import Target from "../../models/order/target.model";
import Action from "../../models/order/action.model";
import Operator from "../../models/operator.model";
import Status from "../../models/order/status.model";
import { ForeignKeyConstraintError, Op } from "sequelize";

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
    statusId: order.statusId,
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

      if (!ctx.request.body.statusId) {
        ctx.body.statusId = "StatusId is required.";
      }

      return;
    }

    await next();
  };
};

router.get("/", async (ctx, next) => {
  ctx.query.pagination.include = [
    Addr,
    Malfunction,
    Target,
    Action,
    Operator,
    Status,
  ];
  let where: any = {};
  if (ctx.query.startDate && ctx.query.endDate) {
    where.date = {
      [Op.between]: [ctx.query.startDate, ctx.query.endDate],
    };
  }

  if (ctx.query.addrId) {
    where.addrId = ctx.query.addrId;
  }
  if (ctx.query.operatorId) {
    where.operatorId = ctx.query.operatorId;
  }

  if (ctx.query.actionId) {
    where.actionId = ctx.query.actionId;
  }
  if (ctx.query.targetId) {
    where.targetId = ctx.query.targetId;
  }
  if (ctx.query.malfunctionId) {
    where.malfunctionId = ctx.query.malfunctionId;
  }

  if (ctx.query.statusId) {
    where.statusId = ctx.query.statusId;
  }

  ctx.query.pagination.order = [["date", "DESC"]];
  ctx.query.pagination.where = where;
  await OrderModel.findAll(ctx.query.pagination).then((orders) => {
    ctx.body = orders;
  });

  await OrderModel.findAll({ where: where }).then((orders) => {
    ctx.set("X-Total-Count", orders.length + "");
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
