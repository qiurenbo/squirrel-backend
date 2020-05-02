import * as Router from "koa-router";
import OrderRouter from "./order.router";
import AddrRouter from "./addr.router";
import AccountRouter from "./account.router";
import authenticationMiddleware from "../middlewares/jwt.middleware";
const router = new Router({ prefix: "/api" });

router.use("/orders", OrderRouter.routes());
router.use("/addrs", authenticationMiddleware(), AddrRouter.routes());
router.use("/accounts", AccountRouter.routes());

export default router;
