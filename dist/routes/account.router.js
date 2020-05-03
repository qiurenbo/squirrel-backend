"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Router = require("koa-router");
const crypto = require("crypto");
const Account_model_1 = require("../models/Account.model");
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
const jwt = require("jsonwebtoken");
const jwt_middleware_1 = require("../middlewares/jwt.middleware");
const router = new Router();
const cryptoPassword = (password) => {
    return crypto
        .createHmac("sha256", process.env.CRYPRTO_KEY)
        .update(password)
        .digest("base64");
};
const cloneAccountWithoutPassword = (account) => {
    return {
        id: account.id,
        username: account.username,
        email: account.email,
    };
};
const validationMiddleware = () => {
    return async (ctx, next) => {
        if (!ctx.request.body.password ||
            !ctx.request.body.username ||
            !ctx.request.body.email) {
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
    return async (ctx, next) => {
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
    ctx.request.body.id = uuid_1.v4();
    ctx.request.body.password = cryptoPassword(ctx.request.body.password);
    await Account_model_1.default.create(ctx.request.body).then((Account) => {
        ctx.body = cloneAccountWithoutPassword(Account);
    }, (error) => {
        if (error instanceof sequelize_1.UniqueConstraintError) {
            ctx.status = 409;
            ctx.body = {};
            ctx.body.email = "Email already exists.";
        }
    });
});
router.post("/login", loginValidationMiddleware(), async (ctx, next) => {
    // Authentication
    await Account_model_1.default.findOne({
        where: { email: ctx.request.body.email },
    }).then((account) => {
        if (account.password === cryptoPassword(ctx.request.body.password)) {
            const token = jwt.sign({ email: account.email }, process.env.CRYPRTO_KEY, { expiresIn: "7d" });
            ctx.body = { accessToken: token };
        }
    });
});
router.put("/:id", jwt_middleware_1.default(), loginValidationMiddleware(), async (ctx, next) => {
    await Account_model_1.default.findOne({ where: { id: ctx.params.id } }).then(async (Account) => {
        if (Account) {
            Account.password = cryptoPassword(Account.password);
            await Account.update(Account).then((Account) => {
                ctx.body = cloneAccountWithoutPassword(Account);
            });
        }
        else {
            ctx.status = 404;
            ctx.body = {};
        }
    });
});
router.delete("/:id", jwt_middleware_1.default(), async (ctx, next) => {
    await Account_model_1.default.destroy({
        where: { id: ctx.params.id },
    }).then(() => {
        ctx.body = {};
    });
});
exports.default = router;
//# sourceMappingURL=account.router.js.map