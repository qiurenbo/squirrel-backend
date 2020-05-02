import * as jwt from "jsonwebtoken";

const authenticationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (ctx.header.authorization?.startsWith("Bearer")) {
      const token = ctx.header.authorization.replace("Bearer ", "");

      try {
        const object = jwt.verify(token, process.env.CRYPRTO_KEY);
        await next();
      } catch (error) {
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
    } else {
      ctx.status = 400;
      ctx.body = { error: "Token is required." };
      return;
    }
  };
};
export default authenticationMiddleware;
