import * as Router from "koa-router";
import ActionRouter from "./action.router";
import TargetRouter from "./target.router";
import MalfunctonRouter from "./malfunction.router";
import OrderRouter from "./order.router";
const router = new Router();
router.use("", OrderRouter.routes());
router.use("/actions", ActionRouter.routes());
router.use("/targets", TargetRouter.routes());
router.use("/malfunctions", MalfunctonRouter.routes());

export default router;
