import * as Router from "koa-router";
import ActionRouter from "./action.router";
import TargetRouter from "./target.router";
import MalfunctonRouter from "./malfunction.router";
import OrderRouter from "./order.router";
import StatsRouter from "./stats.router";
import StatusRouter from "./status.router";
import ProjectsRouter from "./projects.router";
const router = new Router();

router.use("/projects", ProjectsRouter.routes());
router.use("/statuses", StatusRouter.routes());
router.use("/actions", ActionRouter.routes());
router.use("/targets", TargetRouter.routes());
router.use("/malfunctions", MalfunctonRouter.routes());
router.use("/stats", StatsRouter.routes());
router.use("", OrderRouter.routes());
export default router;
