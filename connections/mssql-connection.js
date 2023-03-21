import { Sequelize } from "sequelize";
import { DB_NAME, DB_PASSWORD, DB_SERVER, DB_USER } from "../utils/config.js";
import logger from "../utils/logger.js";

const config = {
  host: DB_SERVER,
  dialect: "mssql",
  logging: (msg) => logger.debug(msg),
};

const mssql = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, config);

mssql
  .authenticate()
  .then(() => logger.info("Connection has been established successfully."))
  .catch((err) => logger.error("Unable to connect to the database: ", err));

mssql.sync();
export default mssql;
