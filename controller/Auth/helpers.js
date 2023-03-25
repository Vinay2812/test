import { users } from "../../models/User.js";
import bcrypt from "bcrypt"
import logger from "../../utils/logger.js";
import { setCache } from "../../utils/cache.js";

export async function getHash(data){
  const genSalt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(data, genSalt);
  return hash;
}

export async function compareHash(hashedData, data){
  const comaredRes = await bcrypt.compare(data, hashedData);
  return comaredRes;
}

export async function getOneUser(query) {
  const user = await users.findOne(query);
  return user.dataValues;
}

export async function updateOneUser(query){
  const { where, set } = query;
  const [affected_rows, user] = await users.update(set, { where, returning: true, plain: true });
  await setCache(`login:${user.dataValues.userId}`, user.dataValues)
  return user.dataValues;
}