"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const authenticationMiddleware = () => {
    return async (ctx, next) => {
        var _a;
        if ((_a = ctx.header.authorization) === null || _a === void 0 ? void 0 : _a.startsWith("Bearer")) {
            const token = ctx.header.authorization.replace("Bearer ", "");
            try {
                const object = jwt.verify(token, process.env.CRYPRTO_KEY);
                await next();
            }
            catch (error) {
                ctx.status = 400;
                switch (error.name) {
                    case "TokenExpiredError":
                        ctx.body = { error: "Token already expired." };
                    case "JsonWebTokenError":
                        ctx.body = { error: "Token is invalid." };
                    default:
                        ctx.body = { error: "Token is invalid." };
                }
                return;
            }
        }
        else {
            ctx.status = 400;
            ctx.body = { error: "Token is required." };
            return;
        }
    };
};
exports.default = authenticationMiddleware;
//# sourceMappingURL=jwt.middleware.js.map