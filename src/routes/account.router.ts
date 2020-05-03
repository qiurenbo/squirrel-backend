import * as Router from "koa-router";
import * as crypto from "crypto";
import AccountModel from "../models/Account.model";
import { v4 as uuidv4 } from "uuid";
import { UniqueConstraintError } from "sequelize";
import * as jwt from "jsonwebtoken";
import authenticationMiddleware from "../middlewares/jwt.middleware";
const router = new Router();

const cryptoPassword = (password: string) => {
  return crypto
    .createHmac("sha256", process.env.CRYPRTO_KEY)
    .update(password)
    .digest("base64");
};

const cloneAccountWithoutPassword = (account: AccountModel) => {
  return {
    id: account.id,
    username: account.username,
    email: account.email
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

router.post("/", validationMiddleware(), async (ctx, next) => {
  ctx.request.body.id = uuidv4();
  ctx.request.body.password = cryptoPassword(ctx.request.body.password);

  await AccountModel.create(ctx.request.body).then(
    Account => {
      ctx.body = cloneAccountWithoutPassword(Account);
    },
    error => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = {};
        ctx.body.email = "Email already exists.";
      }
    }
  );
});

router.post("/login", loginValidationMiddleware(), async (ctx, next) => {
  // Authentication
  await AccountModel.findOne({
    where: { email: ctx.request.body.email }
  }).then(account => {
    if (account.password === cryptoPassword(ctx.request.body.password)) {
      const token = jwt.sign(
        { email: account.email },
        process.env.CRYPRTO_KEY,
        { expiresIn: "7d" }
      );
      ctx.body = { accessToken: token };
    }
  });
});

router.put(
  "/:id",
  authenticationMiddleware(),
  loginValidationMiddleware(),
  async (ctx, next) => {
    await AccountModel.findOne({ where: { id: ctx.params.id } }).then(
      async Account => {
        if (Account) {
          Account.password = cryptoPassword(Account.password);
          await Account.update(Account).then(Account => {
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
    where: { id: ctx.params.id }
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
