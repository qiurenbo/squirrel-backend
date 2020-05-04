import * as Router from "koa-router";

import AccountModel from "../models/Account.model";
import { v4 as uuidv4 } from "uuid";
import { UniqueConstraintError } from "sequelize";

import authenticationMiddleware from "../middlewares/jwt.middleware";
import { cryptoPassword } from "../utils";
const router = new Router();

const cloneAccountWithoutPassword = (account: AccountModel) => {
  return {
    id: account.id,
    username: account.username,
    email: account.email,
  };
};

const validationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (
      !ctx.request.body.password ||
      !ctx.request.body.username ||
      !ctx.request.body.email
    ) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.password) {
        ctx.body.password = "Password is required.";
      }

      if (!ctx.request.body.username) {
        ctx.body.username = "Username is required.";
      }

      if (!ctx.request.body.email) {
        ctx.body.email = "Email is required.";
      }

      return;
    }

    await next();
  };
};

router.post("/", validationMiddleware(), async (ctx, next) => {
  ctx.request.body.id = uuidv4();
  ctx.request.body.password = cryptoPassword(ctx.request.body.password);

  await AccountModel.create(ctx.request.body).then(
    (Account) => {
      ctx.body = cloneAccountWithoutPassword(Account);
    },
    (error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = {};
        ctx.body.email = "Email already exists.";
      }
    }
  );
});

router.put(
  "/:id",
  authenticationMiddleware(),
  validationMiddleware(),
  async (ctx, next) => {
    await AccountModel.findOne({ where: { id: ctx.params.id } }).then(
      async (Account) => {
        if (Account) {
          Account.password = cryptoPassword(Account.password);
          await Account.update(Account).then((Account) => {
            ctx.body = cloneAccountWithoutPassword(Account);
          });
        } else {
          ctx.status = 404;
          ctx.body = {};
        }
      }
    );
  }
);

router.delete("/:id", authenticationMiddleware(), async (ctx, next) => {
  await AccountModel.destroy({
    where: { id: ctx.params.id },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
