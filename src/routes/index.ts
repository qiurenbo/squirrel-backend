import * as Router from "koa-router";
import OrderRouter from "./order";
import AddrRouter from "./addr.router";
import AccountRouter from "./account.router";
import LoginRouter from "./login.router";
import OperatorRouter from "./operator.router";
import DivisionRouter from "./division.router";
import MinorTargetRouter from "./minorTarget.router";
import HandOutRouter from "./handout";
import authenticationMiddleware from "../middlewares/jwt.middleware";
const router = new Router({ prefix: "/api" });
router.use(
  "/minorTargetTypes",
  authenticationMiddleware(),
  MinorTargetRouter.routes()
);

router.use("/handouts", authenticationMiddleware(), HandOutRouter.routes());
router.use("/divisions", authenticationMiddleware(), DivisionRouter.routes());
router.use("/operators", authenticationMiddleware(), OperatorRouter.routes());
router.use("/orders", authenticationMiddleware(), OrderRouter.routes());
router.use("/addrs", authenticationMiddleware(), AddrRouter.routes());
router.use("/accounts", authenticationMiddleware(), AccountRouter.routes());
router.use("", LoginRouter.routes());

export default router;
