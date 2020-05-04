import * as Router from "koa-router";
import OrderRouter from "./order.router";
import AddrRouter from "./addr.router";
import AccountRouter from "./account.router";
import LoginRouter from "./login.router";
import authenticationMiddleware from "../middlewares/jwt.middleware";
const router = new Router({ prefix: "/api" });

router.use("/orders", authenticationMiddleware(), OrderRouter.routes());
router.use("/addrs", authenticationMiddleware(), AddrRouter.routes());
router.use("/accounts", authenticationMiddleware(), AccountRouter.routes());
router.use("", LoginRouter.routes());
export default router;
