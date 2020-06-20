import * as jwt from "jsonwebtoken";
enum ErrorType {
  UNKOWN,
}

const errorHandler = () => {
  return async (ctx: any, next: any) => {
    if (!ctx.status) {
      ctx.status = 500;
      ctx.error = {
        msg: "Unkonwn Error",
        code: ErrorType.UNKOWN,
      };
    }
  };
};
export default errorHandler;
