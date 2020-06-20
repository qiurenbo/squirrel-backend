import * as Router from "koa-router";

import AccountModel from "../models/account.model";

import { UniqueConstraintError } from "sequelize";

import authenticate from "../middlewares/jwt.middleware";
import { cryptoPassword } from "../utils";
const router = new Router();

const cloneAccountWithoutPassword = (account: AccountModel) => {
  return {
    id: account.id,
    username: account.username,
    email: account.email,
  };
};
const cloneAccountsWithoutPassword = (accounts: AccountModel[]) => {
  let array: {
    id: string;
    username: string;
    email: string;
  }[] = [];

  accounts.forEach((account) => {
    array.push(cloneAccountWithoutPassword(account));
  });
  return array;
};

const validationMiddleware = (passwdRequired = true) => {
  return async (ctx: any, next: any) => {
    if (
      (!ctx.request.body.password && passwdRequired) ||
      !ctx.request.body.username ||
      !ctx.request.body.email
    ) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.password && passwdRequired) {
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

router.get("/", async (ctx, next) => {
  await AccountModel.findAll().then((accounts) => {
    ctx.set("X-Total-Count", accounts.length + "");
  });
  await AccountModel.findAll(ctx.query.pagination).then((accounts) => {
    ctx.body = cloneAccountsWithoutPassword(accounts);
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  ctx.request.body.password = cryptoPassword(ctx.request.body.password);

  await AccountModel.create(ctx.request.body)
    .then((Account) => {
      ctx.body = cloneAccountWithoutPassword(Account);
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = {};
        ctx.body.error = "Email already exists.";
      }
    });
});

router.put("/:id", validationMiddleware(false), async (ctx, next) => {
  let update: any = {
    username: ctx.request.body.username,
    email: ctx.request.body.email,
  };

  if (ctx.request.body.password) {
    update.password = cryptoPassword(ctx.request.body.password);
  }

  await AccountModel.update(update, { where: { id: ctx.params.id } })
    .then((rows) => {
      // no rows effected
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.id;
        ctx.body = cloneAccountWithoutPassword(ctx.request.body);
      } else {
        ctx.status = 404;
        ctx.body = {};
        ctx.body.error = "Id doesn't exist.";
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = {};
        ctx.body.error = "Email already exists.";
      }
    });
});

router.delete("/:id", authenticate(), async (ctx, next) => {
  await AccountModel.destroy({
    where: { id: ctx.params.id },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
