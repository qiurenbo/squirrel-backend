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
      // return x-total without pagination filter
      Distribute.findAll({ where, include }),
      Distribute.findAll(query),
    ]).then((values) => {
      resolve({ length: values[0].length, distributes: values[1] });
    });
  });
};

const addDistribute = async (distribute: Distribute): Promise<Distribute> => {
  await calcStock(distribute);

  return Distribute.create(distribute);
};

const getDistributeById = (distributeId: string): Promise<Distribute> => {
  return Distribute.findOne({ where: { id: distributeId } });
};

const deleteDistributeById = async (distributeId: string): Promise<number> => {
  await restoreStock(distributeId);

  return Distribute.destroy({
    where: { id: distributeId },
  });
};

// restore stock
const restoreStock = async (
  distributeId: string
): Promise<[number, Purchase[]]> => {
  let preDistribute: Distribute = null;
  await getDistributeById(distributeId).then((p) => {
    preDistribute = p;
  });

  let prePurchase: Purchase = null;
  await getPurchaseById(preDistribute.purchaseId).then((p) => {
    prePurchase = p;
  });

  return editPurchase(prePurchase.id, {
    stock: prePurchase.stock + preDistribute.number,
  });
};

// calculate stock
const calcStock = async (
  distribute: Distribute
): Promise<[number, Purchase[]]> => {
  let purchase: Purchase = null;
  await getPurchaseById(distribute.purchaseId).then((p) => {
    purchase = p;
  });

  return editPurchase(purchase.id, {
    stock: purchase.stock - distribute.number,
  });
};

const editDistribute = async (
  distributeId: string,
  distribute: Distribute
): Promise<[number, Distribute[]]> => {
  await restoreStock(distributeId);

  await calcStock(distribute);

  return Distribute.update(distribute, {
    where: { id: distributeId },
  });
};

export { getDistributes, addDistribute, editDistribute, deleteDistributeById };
