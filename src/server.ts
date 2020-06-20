import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import apiRouter from "./routes";
import sequelize from "./config/mariadb";
import * as cors from "@koa/cors";
import paginate from "./middlewares/pagination.middleware";
import errorHandler from "./middlewares/error.middleware";
const app = new Koa();

app.use(cors({ exposeHeaders: ["X-Total-Count"] }));
app.use(bodyparser());
app.use(paginate());
app.use(apiRouter.routes());
app.use(errorHandler());
app.listen(3000);
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err: any) => {
    console.error("Unable to connect to the database:", err);
  });

console.log("Server running on port 3000");
