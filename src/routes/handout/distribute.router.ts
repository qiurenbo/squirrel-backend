import * as Router from "koa-router";
import {
  getDistributes,
  addDistribute,
  editDistribute,
  deleteDistributeById,
} from "../../services/distribute.service";
const router = new Router();

router.get("/", async (ctx, next) => {
  await getDistributes(ctx.query)
    .then((rs) => {
      ctx.set("X-Total-Count", rs.length + "");
      ctx.body = rs.distributes;
    })
    .catch((error) => {
      ctx.body = error;
    });
});

router.post("/", async (ctx, next) => {
  await addDistribute(ctx.request.body)
    .then((distribute) => {
      ctx.body = distribute;
    })
    .catch((error) => {
      ctx.body = error;
    });
});

router.put("/:distributeId", async (ctx, next) => {
  await editDistribute(ctx.params.distributeId, ctx.request.body)
    .then(([number, distributes]) => {
      ctx.body = distributes;
    })
    .catch((error) => {
      ctx.body = error;
    });
});

router.delete("/:distributeId", async (ctx, next) => {
  await deleteDistributeById(ctx.params.distributeId)
    .then((number) => {
      ctx.body = {};
    })
    .catch((error) => {
      ctx.body = error;
    });
});

export default router;
