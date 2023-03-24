import redisClient from "../connections/redis-connection.js";
import logger from "./logger.js";

export async function setCache(key, value, time_in_sec = 3600) {
  try {
    await redisClient.setEx(key.toLowerCase(), time_in_sec, JSON.stringify(value));
  } catch (err) {
    logger.error(`Failed set to cache for key - ${key}`);
  }
}

export async function getCache(key) {
  try {
    let value = await redisClient.get(key);
    if (!value) return null;
    value = JSON.parse(value);
    return value;
  } catch (err) {
    logger.error(`Failed to get value for key - ${key}`);
  }
}

export function deleteCache(key) {
  try {
    redisClient.del(key);
  } catch (err) {
    logger.error(`Failed to delete value for key - ${key}`);
  }
}
