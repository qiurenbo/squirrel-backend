import * as Router from "koa-router";
import OrderRouter from "./order";
import AddrRouter from "./addr.router";
import AccountRouter from "./account.router";
import LoginRouter from "./login.router";
import OperatorRouter from "./operator.router";
import DivisionRouter from "./division.router";
import MinorTargetRouter from "./minorTarget.router";
import HandOutRouter from "./handout";
import authenticate from "../middlewares/jwt.middleware";
const router = new Router({ prefix: "/api" });
router.use("/minorTargetTypes", authenticate(), MinorTargetRouter.routes());

router.use("/handouts", authenticate(), HandOutRouter.routes());
router.use("/divisions", authenticate(), DivisionRouter.routes());
router.use("/operators", authenticate(), OperatorRouter.routes());
router.use("/orders", authenticate(), OrderRouter.routes());
router.use("/addrs", authenticate(), AddrRouter.routes());
router.use("/accounts", authenticate(), AccountRouter.routes());
router.use("", LoginRouter.routes());

export default router;
