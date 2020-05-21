import * as Router from "koa-router";
import Street from "../models/addr/street.model";
import Area from "../models/addr/area.model";
const router = new Router();

router.get("/", async (ctx, next) => {
  await Street.findAll({ include: [{ model: Area }] }).then((streets) => {
    ctx.body = streets;
  });
});

export default router;
