import * as Router from "koa-router";

import OrderModel from "../models/order.model";
const router = new Router();

router.get("/", async (ctx, next) => {
  // const jane = await OrderModel.create({
  //   id: "1",
  //   name: "Doe",
  //   addr: "dsd",
  //   tel: "dsd",
  //   type: "ds",
  // });
  // ctx.body = { jane };
});

export default router;
