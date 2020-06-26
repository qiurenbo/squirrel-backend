import sequelize from "../config/mariadb";
import { Sequelize, QueryTypes, Model } from "sequelize";

import * as moment from "moment";
export const getWeekStats = async (table: string) => {
  return (
    await sequelize.query(
      `select * from ${table} where YEARWEEK(date)=YEARWEEK(NOW(),1)`,
      { type: QueryTypes.SELECT }
    )
  ).length;
};

export const getYearStats = async (model: Model) => {
  // @ts-ignore:disable-next-line
  return await model.count({
    where: Sequelize.where(
      Sequelize.fn("SUBSTR", Sequelize.col("date"), 1, 4),
      "=",
      moment().format("YYYY")
    ),
  });
};

export const getMonthStats = async (model: Model) => {
  // @ts-ignore:disable-next-line
  return await model.count({
    where: Sequelize.where(
      Sequelize.fn("SUBSTR", Sequelize.col("date"), 1, 6),
      "=",
      moment().format("YYYYMM")
    ),
  });
};
