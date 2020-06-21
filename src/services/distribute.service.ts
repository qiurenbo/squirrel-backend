import {
  UniqueConstraintError,
  ForeignKeyConstraintError,
  Op,
} from "sequelize";

import Distribute from "../models/handout/distribute.model";
import Purchase from "../models/handout/purchase.model";
import { getPurchaseById, editPurchase } from "./purchase.service";
import Operator from "../models/operator.model";
import Addr from "../models/addr/addr.model";

interface IDistributeQueryResult {
  length: number;
  distributes: Distribute[];
}

interface IDistributeFilter {
  pagination?: number;
  startDate?: string;
  endDate?: string;
  purchaseId?: string;
}

const getDistributes = async (
  filter: IDistributeFilter
): Promise<IDistributeQueryResult> => {
  let where: any = {};
  let include: any = [];
  let query: any = filter.pagination;

  query.order = [["date", "DESC"]];

  query.where = where;
  if (filter.startDate && filter.endDate) {
    where.date = {
      [Op.between]: [filter.startDate, filter.endDate],
    };
  }

  if (filter.purchaseId) {
    query.include = [
      { model: Purchase, where: { id: filter.purchaseId } },
      Operator,
      Addr,
    ];
  } else {
    query.include = [Purchase, Operator, Addr];
  }

  return new Promise<IDistributeQueryResult>((resolve, reject) => {
    Promise.all([
      Distribute.findAll({ where, include }),
      Distribute.findAll(query),
    ]).then((values) => {
      resolve({ length: values[0].length, distributes: values[1] });
    });
  });
};

const addDistribute = (distribute: Distribute): Promise<Distribute> => {
  return new Promise((resolve, reject) => {
    Promise.all([
      Distribute.create(distribute),
      getPurchaseById(distribute.purchaseId).then((purchase) => {
        if (!purchase) {
          reject(null);
          return;
        }
        purchase.stock = purchase.stock - distribute.number;
        return editPurchase(distribute.purchaseId, { stock: purchase.stock });
      }),
    ]).then((values) => {
      console.log(values);
      resolve(values[0]);
    });
  });
};

const getDistributeById = (distributeId: string): Promise<Distribute> => {
  return Distribute.findOne({ where: { id: distributeId } });
};

const deleteDistributeById = (distributeId: string): Promise<boolean> => {
  return new Promise(async (resolve, reject) => {
    let preDistribute: Distribute = null;
    await getDistributeById(distributeId).then((p) => {
      preDistribute = p;
    });

    if (!preDistribute) {
      reject(null);
      return;
    }

    Promise.all([
      Distribute.destroy({
        where: { id: distributeId },
      }),
      getPurchaseById(preDistribute.purchaseId).then((purchase) => {
        // restore stock
        purchase.stock = purchase.stock + preDistribute.number;
        editPurchase(purchase.id, { stock: purchase.stock });
      }),
    ]).then((values) => resolve(true));
  });
};

const editDistribute = async (
  distributeId: string,
  distribute: Distribute
): Promise<Distribute> => {
  return new Promise(async (resolve, reject) => {
    let preDistribute: Distribute = null;
    await getDistributeById(distributeId).then((p) => {
      preDistribute = p;
    });

    if (!preDistribute) {
      reject(null);
      return;
    }

    Promise.all([
      Distribute.update(distribute, {
        where: { id: distributeId },
      }),
      getPurchaseById(distribute.purchaseId).then((purchase) => {
        // restore stock and re-calculate stock
        purchase.stock =
          purchase.stock + preDistribute.number - distribute.number;
        editPurchase(purchase.id, { stock: purchase.stock });
      }),
    ]).then((values) => resolve(distribute));
  });
};

export { getDistributes, addDistribute, editDistribute, deleteDistributeById };
