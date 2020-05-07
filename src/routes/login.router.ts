import AccountModel from "models/Account.model";
import * as Router from "koa-router";
import { cryptoPassword } from "utils";
import * as jwt from "jsonwebtoken";
const router = new Router();
const loginValidationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (!ctx.request.body.password || !ctx.request.body.email) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.password) {
        ctx.body.password = "Password is required.";
      }

      if (!ctx.request.body.email) {
        ctx.body.email = "Email is required.";
      }

      return;
    }

    await next();
  };
};

router.post("/login", loginValidationMiddleware(), async (ctx, next) => {
  // Authentication
  await AccountModel.findOne({
    where: { email: ctx.request.body.email },
  }).then((account) => {
    if (account.password === cryptoPassword(ctx.request.body.password)) {
      const token = jwt.sign(
        { email: account.email },
        process.env.CRYPRTO_KEY,
        { expiresIn: "7d" }
      );
      ctx.body = { accessToken: token };
    } else {
      //password is incorrect
      ctx.status = 400;
      ctx.body = { error: "Password is incorrect." };
    }
  });
});
export default router;
