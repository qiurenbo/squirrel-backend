const mariadb = require("mariadb");
const dotenv = require("dotenv");
dotenv.config();
mariadb
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  })
  .then((conn) => {
    conn
      .query(`DROP DATABASE ${process.env.DB_NAME};`)
      .then(() => {
        console.log(`DROP DATABASE ${process.env.DB_NAME};`);
      })
      .catch((err) => {
        //handle query error
      })
      .finally(() => {
        conn.end().then(() => {
          //connection has ended properly
        });
      });
  })
  .catch((err) => {
    //handle connection error
  });
