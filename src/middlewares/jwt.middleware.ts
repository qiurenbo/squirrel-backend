import * as jwt from "jsonwebtoken";

const authenticate = () => {
  return async (ctx: any, next: any) => {
    if (ctx.header.authorization?.startsWith("Bearer")) {
      const token = ctx.header.authorization.replace("Bearer ", "");

      try {
        const object = jwt.verify(token, process.env.CRYPRTO_KEY);
      } catch (error) {
        ctx.status = 403;

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
      await next();
    } else {
      ctx.status = 403;
      ctx.body = { error: "Token is required." };
      return;
    }
  };
};
export default authenticate;
