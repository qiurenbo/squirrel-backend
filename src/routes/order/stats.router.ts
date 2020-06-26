import * as Router from "koa-router";
import OrderModel from "../../models/order/order.model";
import CameraModel from "../../models/order/camera.model";
import ProjectModel from "../../models/order/project.model";
import MalfunctionModel from "../../models/order/malfunction.model";
import TargetModel from "../../models/order/target/target.model";
import * as moment from "moment";
import { Sequelize } from "sequelize";
import {
  getWeekStats,
  getYearStats,
  getMonthStats,
} from "../../services/stats.service";
const router = new Router();

const stats = {
  orderStat: {
    week: 20,
    month: 20,
    year: 20,
  },
  cameraStat: {
    week: 20,
    month: 20,
    year: 20,
  },
  projectStat: {
    week: 20,
    month: 20,
    year: 20,
  },
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
  stats.orderStat.week = await getWeekStats("orders");
  stats.cameraStat.week = await getWeekStats("cameras");

  stats.projectStat.week = await getWeekStats("projects");

  // @ts-ignore:disable-next-line
  stats.orderStat.month = await getMonthStats(OrderModel);
  // @ts-ignore:disable-next-line
  stats.cameraStat.month = await getMonthStats(CameraModel);
  // @ts-ignore:disable-next-line
  stats.projectStat.month = await getMonthStats(ProjectModel);

  // @ts-ignore:disable-next-line
  stats.orderStat.year = await getYearStats(OrderModel);
  // @ts-ignore:disable-next-line
  stats.cameraStat.year = await getYearStats(CameraModel);
  // @ts-ignore:disable-next-line
  stats.projectStat.year = await getYearStats(ProjectModel);

  stats.pieOfTargets = await OrderModel.findAll({
    where: {},
    include: [TargetModel],
    group: ["Target.name"],
    attributes: [
      "Target.name",
      [Sequelize.fn("COUNT", "Target.name"), "count"],
    ],
  }).then((resultSet: any) => {
    // count is an integer
    return generatePieDataStructrue(resultSet, "Target");
  });

  stats.pieOfMalfunctions = await OrderModel.findAll({
    where: {},
    include: [MalfunctionModel],
    group: ["Malfunction.name"],
    attributes: [
      "Malfunction.name",
      [Sequelize.fn("COUNT", "Malfunction.name"), "count"],
    ],
  }).then((resultSet: any) => {
    // count is an integer
    return generatePieDataStructrue(resultSet, "Malfunction");
  });

  ctx.body = stats;
});

export default router;
