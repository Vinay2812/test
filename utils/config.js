import dotenv from "dotenv";
dotenv.config();

export const {
  NODE_ENV,
  SERVER_PORT = 5001,
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_SERVER,
  SOCKET_PORT = 5500,
} = process.env;
