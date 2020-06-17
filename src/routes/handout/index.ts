import * as Router from "koa-router";
import PurchaseRouter from "./purchase.router";
import DistributeRouter from "./distribute.router";
const router = new Router();
router.use("/purchases", PurchaseRouter.routes());
router.use("/distributes", DistributeRouter.routes());
export default router;
