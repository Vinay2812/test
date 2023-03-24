import express from "express"
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"

// Import routes here
import InvalidRoute from "./routes/InvalidRoute.js"
import AuthRoute from "./routes/AuthRoute.js"
import OtpRoute from "./routes/OtpRoute.js"
import UserRoute from "./routes/UserRoute.js"
// Import port
import { SERVER_PORT } from "./utils/config.js"
import logger from "./utils/logger.js"

// connections
import "./connections/mssql-connection.js"
import sync from "./utils/sync.js"
import { connectMssql } from "./connections/mssql-connection.js"
import { connectRedis } from "./connections/redis-connection.js"

const app = express();

// middlewares
app.use(cors({
    origin: "*"
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(helmet());
app.use(morgan(":status :method :url :response-time ms"))

// routes
// valid routes
app.use("/auth", AuthRoute);
app.use("/otp", OtpRoute)
app.use("/user", UserRoute)

// invalid routes
app.use(InvalidRoute);

// server
app.listen(SERVER_PORT, ()=>{
    logger.info(`Server running on port ${SERVER_PORT}`);
    connectMssql();
    connectRedis();
    sync();
})