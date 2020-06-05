import * as Router from "koa-router";
import ProjectModel from "../../models/order/project.model";
import Addr from "../../models/addr/addr.model";
import Operator from "../../models/operator.model";
import Status from "../../models/order/status.model";
import { ForeignKeyConstraintError, Op } from "sequelize";
import Area from "../../models/addr/area.model";
import Street from "../../models/addr/street.model";

const router = new Router();

// Sequelize default use UTC time
const cloneProject = (project: ProjectModel) => {
  return {
    id: project.id,
    name: project.name,
    date: project.date,
    addrId: project.addrId,
    operatorId: project.operatorId,
    statusId: project.statusId,
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

  await ProjectModel.findAll(ctx.query.pagination).then((projects) => {
    ctx.body = projects;
  });

  await ProjectModel.findAll({ where: where }).then((projects) => {
    ctx.set("X-Total-Count", projects.length + "");
  });
});

router.post("/", validationMiddleware(), async (ctx, next) => {
  await ProjectModel.create(ctx.request.body)
    .then((project) => {
      ctx.body = cloneProject(project);
    })
    .catch((error) => {
      if (error instanceof ForeignKeyConstraintError) {
        ctx.status = 400;
        ctx.body = { error: "ForeignKey doesn't exist." };
      }
    });
});

router.put("/:projectId", validationMiddleware(), async (ctx, next) => {
  await ProjectModel.update(ctx.request.body, {
    where: { id: ctx.params.projectId },
  })
    .then((rows) => {
      //if rows effected
      if (rows[0] !== 0) {
        ctx.request.body.id = ctx.params.projectId;
        ctx.body = cloneProject(ctx.request.body);
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

router.delete("/:projectId", async (ctx, next) => {
  await ProjectModel.destroy({
    where: { id: ctx.params.projectId },
  }).then(() => {
    ctx.body = {};
  });
});

export default router;
