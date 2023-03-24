import { createClient } from "redis";
import { REDIS_HOST } from "../utils/config.js";
import logger from "../utils/logger.js";

const redisClient = createClient({
    url: REDIS_HOST
})

redisClient.on("connect", ()=>{
    logger.info(`Redis connected on ${REDIS_HOST}`);
})
redisClient.on("error", (err)=>{
    logger.error(`Redis connection error: ${err}`);
});
export async function connectRedis(){
    await redisClient.connect();
}

export default redisClient;