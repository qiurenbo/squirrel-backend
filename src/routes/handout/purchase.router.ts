import * as Router from "koa-router";
import PurchaseModel from "../../models/handout/purchase.model";
import { UniqueConstraintError, Op } from "sequelize";
const router = new Router();

router.get("/", async (ctx, next) => {
  let query: any = ctx.query.pagination;

  let where: any = {};
  query.where = where;
  if (ctx.query.startDate && ctx.query.endDate) {
    where.date = {
      [Op.between]: [ctx.query.startDate, ctx.query.endDate],
    };
  }

  query.order = [["date", "DESC"]];

  await PurchaseModel.findAll().then((purchases) => {
    ctx.set("X-Total-Count", purchases.length + "");
  });
  await PurchaseModel.findAll(query).then((purchases) => {
    ctx.body = purchases;
  });
});

router.post("/", async (ctx, next) => {
  await PurchaseModel.create(ctx.request.body)
    .then((purchase) => {
      ctx.body = purchase;
    })
    .catch((error) => {
      ctx.status = 409;
      ctx.body = error;
    });
});

router.put("/:purchaseId", async (ctx, next) => {
  await PurchaseModel.update(ctx.request.body, {
    where: { id: ctx.params.purchaseId },
  })
    //https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
    .then((rows) => {
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.purchaseId;
        ctx.body = ctx.request.body;
      } else {
        ctx.status = 404;
        ctx.body = { error: "Id doesn't exist." };
      }
    })
    .catch((error) => {
      ctx.status = 409;
      ctx.body = { error: "Name already exists." };
    });
});

router.delete("/:purchaseId", async (ctx, next) => {
  await PurchaseModel.destroy({
    where: { id: ctx.params.purchaseId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
