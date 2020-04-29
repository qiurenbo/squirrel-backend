import * as Router from "koa-router";
import OrderRouter from "./order.router";
import AddrRouter from "./addr.router";
const router = new Router({ prefix: "/api" });

router.use("/orders", OrderRouter.routes());
router.use("/addrs", AddrRouter.routes());
export default router;
