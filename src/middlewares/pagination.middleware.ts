const paginationMiddleware = () => {
  return async (ctx: any, next: any) => {
    let query: { offset?: number; limit?: number } = {};

    if (ctx.query.offset) {
      query.offset = parseInt(ctx.query.offset);
    }

    if (ctx.query.limit) {
      query.limit = parseInt(ctx.query.limit);
    }

    ctx.query.pagination = query;

    await next();
  };
};
export default paginationMiddleware;
