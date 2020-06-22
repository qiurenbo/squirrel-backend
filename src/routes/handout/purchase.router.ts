import * as Router from "koa-router";

import {
  getPurchases,
  addPurchase,
  editPurchase,
  deletePurchaseById,
} from "../../services/purchase.service";
const router = new Router();

router.get("/", async (ctx, next) => {
  await getPurchases(ctx.query)
    .then((rs) => {
      ctx.set("X-Total-Count", rs.length + "");
      ctx.body = rs.purchases;
    })
    .catch((err) => {});
});

router.post("/", async (ctx, next) => {
  await addPurchase(ctx.request.body)
    .then((purchase) => {
      ctx.body = purchase;
    })
    .catch((err) => {});
});

router.put("/:purchaseId", async (ctx, next) => {
  await editPurchase(ctx.params.purchaseId, ctx.request.body)
    .then(([number, purchases]) => {
      ctx.body = purchases;
    })
    .catch((err) => {});
});

router.delete("/:purchaseId", async (ctx, next) => {
  await deletePurchaseById(ctx.params.purchaseId)
    .then(() => {
      ctx.body = {};
    })
    .catch();
});

export default router;
