import * as Router from "koa-router";
import CameraModel from "../../models/order/camera.model";
import Addr from "../../models/addr/addr.model";
import Operator from "../../models/operator.model";
import Status from "../../models/order/status.model";
import { ForeignKeyConstraintError, Op } from "sequelize";
import Area from "../../models/addr/area.model";
import Street from "../../models/addr/street.model";

const router = new Router();

// Sequelize default use UTC time
const cloneCamera = (camera: CameraModel) => {
  return {
    id: camera.id,
    name: camera.name,
    date: camera.date,
    addrId: camera.addrId,
    operatorId: camera.operatorId,
    statusId: camera.statusId,
  };
};

const validationMiddleware = () => {
  return async (ctx: any, next: any) => {
    if (
      !ctx.request.body.date ||
      !ctx.request.body.addrId ||
      !ctx.request.body.operatorId ||
      !ctx.request.body.statusId
    ) {
      ctx.status = 400;
      ctx.body = {};
      if (!ctx.request.body.date) {
        ctx.body.date = "Date is required.";
      }

      if (!ctx.request.body.addrId) {
        ctx.body.addrId = "AddrId is required.";
      }

      if (!ctx.request.body.operatorId) {
        ctx.body.operatorId = "OperatorId is required.";
      }

      if (!ctx.request.body.statusId) {
        ctx.body.statusId = "StatusId is required.";
      }

      return;
    }

    await next();
  };
};

router.get("/", async (ctx, next) => {
  ctx.query.pagination.include = [
    {
      model: Addr,
      include: [{ model: Street, include: [Area] }],
    },
    Operator,
    Status,
  ];

  let where: any = {};
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

  if (ctx.query.statusId) {
    where.statusId = ctx.query.statusId;
  }

  ctx.query.pagination.order = [["date", "DESC"]];
  ctx.query.pagination.where = where;

  await CameraModel.findAll(ctx.query.pagination).then((cameras) => {
    ctx.body = cameras;
  });

  await CameraModel.findAll({ where: where }).then((cameras) => {
    ctx.set("X-Total-Count", cameras.length + "");
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await CameraModel.create(ctx.request.body)
    .then((camera) => {
      ctx.body = cloneCamera(camera);
    })
    .catch((error) => {
      if (error instanceof ForeignKeyConstraintError) {
        ctx.status = 400;
        ctx.body = { error: "ForeignKey doesn't exist." };
      }
    });
});

router.put("/:cameraId", validationMiddleware(), async (ctx, next) => {
  await CameraModel.update(ctx.request.body, {
    where: { id: ctx.params.cameraId },
  })
    .then((rows) => {
      //if rows effected
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.cameraId;
        ctx.body = cloneCamera(ctx.request.body);
      } else {
        ctx.status = 404;
        ctx.body = { error: "Id doesn't exists." };
      }
    })
    .catch((error) => {
      if (error instanceof ForeignKeyConstraintError) {
        ctx.status = 400;
        ctx.body = { error: "ForeignKey doesn't exist." };
      }
    });
});

router.delete("/:cameraId", async (ctx, next) => {
  await CameraModel.destroy({
    where: { id: ctx.params.cameraId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
