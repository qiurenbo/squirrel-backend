import {
  UniqueConstraintError,
  ForeignKeyConstraintError,
  Op,
  CITEXT,
} from "sequelize";

import Purchase from "../models/handout/purchase.model";

interface IPurchaseQueryResult {
  length: number;
  purchases: Purchase[];
}

interface IPurchaseFilter {
  pagination?: number;
  startDate?: string;
  endDate?: string;
  purchaseId?: string;
}

const getPurchases = async (
  filter: IPurchaseFilter
): Promise<IPurchaseQueryResult> => {
  let where: any = {};
  let query: any = filter.pagination;
  let rs: IPurchaseQueryResult = {
    length: 0,
    purchases: [],
  };
  query.order = [["date", "DESC"]];

  query.where = where;
  if (filter.startDate && filter.endDate) {
    where.date = {
      [Op.between]: [filter.startDate, filter.endDate],
    };
  }

  if (filter.purchaseId) {
    where.id = filter.purchaseId;
  }

  return new Promise<IPurchaseQueryResult>((resolve, reject) => {
    Promise.all([Purchase.findAll(where), Purchase.findAll(query)]).then(
      (values) => {
        resolve({ length: values[0].length, purchases: values[1] });
      }
    );
  });
};

const addPurchase = (purchase: any): Promise<Purchase> => {
  // default stock equals number
  purchase.stock = purchase.number;
  return Purchase.create(purchase);
};

const getPurchaseById = (purchaseId: string): Promise<Purchase> => {
  return Purchase.findOne({ where: { id: purchaseId } });
};

const deletePurchaseById = (purchaseId: string): Promise<number> => {
  return Purchase.destroy({
    where: { id: purchaseId },
  });
};
const editPurchase = async (
  purchaseId: string,
  purchase: any
): Promise<[number, Purchase[]]> => {
  return Purchase.update(purchase, {
    where: { id: purchaseId },
  });

  //https://stackoverflow.com/questions/38524938/sequelize-update-record-and-return-result
  // .then((rows) => {
  //   if (rows[0] !== 0) {
  //     ctx.request.body.id = ctx.params.purchaseId;
  //     ctx.body = ctx.request.body;
  //   } else {
  //     ctx.status = 404;
  //     ctx.body = { error: "Id doesn't exist." };
  //   }
  // })
  // .catch((error) => {
  //   ctx.status = 409;
  //   ctx.body = { error: "Name already exists." };
  // });
};
export {
  getPurchases,
  addPurchase,
  editPurchase,
  deletePurchaseById,
  getPurchaseById,
};
