import * as Router from "koa-router";
import DistributeModel from "../../models/handout/distribute.model";
import {
  UniqueConstraintError,
  ForeignKeyConstraintError,
  Op,
} from "sequelize";
import Addr from "../../models/addr/addr.model";
import Street from "../../models/addr/street.model";
import Area from "../../models/addr/area.model";
import Operator from "../../models/operator.model";
import Purchase from "../../models/handout/purchase.model";
const router = new Router();

router.get("/", async (ctx, next) => {
  let query: any = ctx.query.pagination;
  query.include = [
    {
      model: Addr,
      include: [{ model: Street, include: [Area] }],
    },
    Addr,
    Operator,
    Purchase,
  ];
  let where: any = {};
  query.where = where;
  if (ctx.query.startDate && ctx.query.endDate) {
    where.date = {
      [Op.between]: [ctx.query.startDate, ctx.query.endDate],
    };
  }

  if (ctx.query.addrId) {
    where.addrId = ctx.query.addrId;
  }
  if (ctx.query.operatorId) {
    where.operatorId = ctx.query.operatorId;
  }

  if (ctx.query.actionId) {
    where.actionId = ctx.query.actionId;
  }
  if (ctx.query.targetId) {
    where.targetId = ctx.query.targetId;
  }
  if (ctx.query.malfunctionId) {
    where.malfunctionId = ctx.query.malfunctionId;
  }

  if (ctx.query.statusId) {
    where.statusId = ctx.query.statusId;
  }

  query.order = [["date", "DESC"]];

  await DistributeModel.findAll(query).then((distributes) => {
    ctx.body = distributes;
  });

  await DistributeModel.findAll().then((distributes) => {
    ctx.set("X-Total-Count", distributes.length + "");
  });
});

router.post("/", async (ctx, next) => {
  await DistributeModel.create(ctx.request.body)
    .then((distribute) => {
      ctx.body = distribute;
    })
    .catch((error) => {
      ctx.status = 409;
      if (error instanceof UniqueConstraintError) {
        ctx.body = { error: "Name already exists." };
      } else {
        ctx.body = error;
      }
    });

  await Purchase.findOne({
    where: { id: ctx.request.body.purchaseId },
  }).then(async (purchase) => {
    await Purchase.update(
      { stock: purchase.number - ctx.request.body.number },
      {
        where: { id: ctx.request.body.purchaseId },
      }
    ).then(() => {});
  });
});

router.put("/:distributeId", async (ctx, next) => {
  await DistributeModel.update(ctx.request.body, {
    where: { id: ctx.params.distributeId },
  })
    //https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
    .then((rows) => {
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.distributeId;
        ctx.body = ctx.request.body;
      } else {
        ctx.status = 404;
        ctx.body = { error: "Id doesn't exist." };
      }
    })
    .catch((error) => {
      if (error instanceof UniqueConstraintError) {
        ctx.status = 409;
        ctx.body = { error: "Name already exists." };
      }
    });
});

router.delete("/:distributeId", async (ctx, next) => {
  let distribute: DistributeModel | null = null;
  await DistributeModel.findOne({
    where: { id: ctx.params.distributeId },
  }).then((d) => {
    distribute = d;
  });

  await DistributeModel.destroy({
    where: { id: ctx.params.distributeId },
  }).then(async () => {
    ctx.body = {};

    await Purchase.findOne({
      where: { id: distribute.purchaseId },
    }).then(async (purchase) => {
      await Purchase.update(
        { stock: purchase.stock + distribute.number },
        {
          where: { id: distribute.purchaseId },
        }
      ).then(() => {});
    });
  });
});

export default router;
