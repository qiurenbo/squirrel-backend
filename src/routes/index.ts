import * as Router from "koa-router";
import OrderRouter from "./order/order.router";
import AddrRouter from "./addr.router";
import AccountRouter from "./account.router";
import LoginRouter from "./login.router";
import OperatorRouter from "./operator.router";
import authenticationMiddleware from "../middlewares/jwt.middleware";
const router = new Router({ prefix: "/api" });

router.use("/operators", OperatorRouter.routes());
router.use("/orders", authenticationMiddleware(), OrderRouter.routes());
router.use("/addrs", authenticationMiddleware(), AddrRouter.routes());
router.use("/accounts", authenticationMiddleware(), AccountRouter.routes());
router.use("", LoginRouter.routes());

export default router;
