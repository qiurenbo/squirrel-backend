import * as Router from "koa-router";
import ActionRouter from "./action.router";
import OrderModel from "../../models/order/order.model";
const router = new Router();

router.use("/actions", ActionRouter.routes());
// Sequelize default use UTC time
const cloneOrder = (order: OrderModel) => {
  return {
    id: order.id,
  };
};

const validationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (
      !ctx.request.body.name ||
      !ctx.request.body.order ||
      !ctx.request.body.tel ||
      !ctx.request.body.type
    ) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.name) {
        ctx.body.name = "Name is required.";
      }

      if (!ctx.request.body.order) {
        ctx.body.order = "Order is required.";
      }

      if (!ctx.request.body.tel) {
        ctx.body.tel = "Tel is required.";
      }

      if (!ctx.request.body.type) {
        ctx.body.type = "Type is required.";
      }

      return;
    }

    await next();
  };
};

router.get("/", async (ctx, next) => {
  await OrderModel.findAll().then((orders) => {
    ctx.body = orders;
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await OrderModel.findOne({ where: { name: ctx.request.body.name } }).then(
    async (order) => {
      if (!order) {
        await OrderModel.create(ctx.request.body).then((order) => {
          ctx.body = cloneOrder(order);
        });
      } else {
        ctx.status = 400;
        ctx.body = { name: "Name already exists." };
      }
    }
  );
});

router.put("/:orderId", validationMiddleware(), async (ctx, next) => {
  await OrderModel.findOne({ where: { id: ctx.params.orderId } }).then(
    async (order) => {
      if (order) {
        await order.update(ctx.request.body).then((order) => {
          ctx.body = cloneOrder(order);
        });
      } else {
        ctx.status = 404;
        ctx.body = {};
      }
    }
  );
});

router.delete("/:orderId", async (ctx, next) => {
  await OrderModel.destroy({
    where: { id: ctx.params.orderId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
