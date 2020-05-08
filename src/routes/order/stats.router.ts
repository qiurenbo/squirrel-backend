import * as Router from "koa-router";
import OrderModel from "models/order/order.model";

import MalfunctionModel from "models/order/malfunction.model";
import TargetModel from "models/order/target.model";
import * as moment from "moment";
import { Sequelize } from "sequelize";
const router = new Router();

const orderStats = {
  orderOfToday: 45,
  orderOfCurMonth: 95,

  orderOfCurYear: 185,
  orderOfHistory: 325,

  pieOfMalfunctions: {
    lengend: ["无法开机", "无法联网", "软件异常"],
    series: [
      { value: 335, name: "无法开机" },
      { value: 310, name: "无法联网" },
      { value: 234, name: "软件异常" },
    ],
  },

  pieOfTargets: {
    lengend: ["海恒——自助借还机", "联想——业务机", "TPLink——路由器"],
    series: [
      { value: 35, name: "海恒——自助借还机" },
      { value: 10, name: "联想——业务机" },
      { value: 24, name: "TPLink——路由器" },
    ],
  },
};

const generatePieDataStructrue = (resultSet: any, modelName: string) => {
  let lengend: string[] = [];
  let series: { value: number; name: string }[] = [];

  resultSet.forEach((result: any) => {
    lengend.push(result.dataValues[modelName].name);
    series.push({
      value: result.dataValues.count,
      name: result.dataValues[modelName].name,
    });
  });

  return { lengend, series };
};

router.get("/", async (ctx, next) => {
  //https://stackoverflow.com/questions/22643263/how-to-get-a-distinct-count-with-sequelize

  await OrderModel.count({
    where: { date: moment().format("YYYYMMDD") },
  }).then((count) => {
    // count is an integer
    orderStats.orderOfToday = count;
  });

  await OrderModel.count({
    //https://github.com/sequelize/sequelize/issues/7535
    where: Sequelize.where(
      Sequelize.fn("SUBSTR", Sequelize.col("date"), 1, 6),
      "=",
      moment().format("YYYYMM")
    ),
  }).then(function (count) {
    // count is an integer
    orderStats.orderOfCurMonth = count;
  });

  await OrderModel.count({
    where: Sequelize.where(
      Sequelize.fn("SUBSTR", Sequelize.col("date"), 1, 4),
      "=",
      moment().format("YYYY")
    ),
  }).then((count) => {
    // count is an integer
    orderStats.orderOfCurYear = count;
  });

  await OrderModel.count({
    where: {},
  }).then((count) => {
    // count is an integer
    orderStats.orderOfHistory = count;
  });

  await OrderModel.findAll({
    where: {},
    include: [TargetModel],
    group: ["Target.name"],
    attributes: [
      "Target.name",
      [Sequelize.fn("COUNT", "Target.name"), "count"],
    ],
  }).then((resultSet) => {
    // count is an integer
    orderStats.pieOfTargets = generatePieDataStructrue(resultSet, "Target");
  });

  await OrderModel.findAll({
    where: {},
    include: [MalfunctionModel],
    group: ["Malfunction.name"],
    attributes: [
      "Malfunction.name",
      [Sequelize.fn("COUNT", "Malfunction.name"), "count"],
    ],
  }).then((resultSet) => {
    // count is an integer
    orderStats.pieOfMalfunctions = generatePieDataStructrue(
      resultSet,
      "Malfunction"
    );
  });

  ctx.body = orderStats;
});

export default router;
