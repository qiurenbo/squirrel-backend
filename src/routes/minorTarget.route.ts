import * as Router from "koa-router";
import MinorTargetType from "../models/order/target/minor-target-type.model";
import MajorTargetType from "../models/order/target/major-target-type.model";
const router = new Router();

router.get("/", async (ctx, next) => {
  await MinorTargetType.findAll({ include: [{ model: MajorTargetType }] }).then(
    (types) => {
      ctx.body = types;
    }
  );
});

export default router;
