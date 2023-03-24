import mssql from "../../connections/mssql-connection.js";
import { loginReq, registerReq, updateUserReq } from "./AuthValidator.js";
import { validateReq } from "../../utils/joi.js";
import { users } from "../../models/User.js";
import { getRandomId } from "../../utils/random.js";
import { getOneUser, compareHash, updateOneUser } from "./helpers.js";
import { SendResponse } from "../../utils/response.js";
import bcrypt from "bcrypt";
import { getCache, setCache } from "../../utils/cache.js";
import logger from "../../utils/logger.js";
import { Sequelize } from "sequelize";

export async function register(req, res) {
  const { error, value } = validateReq(registerReq, req.body);
  if (error) {
    return SendResponse(res, 422, { message: error });
  }
  const { username, password, email, address, mobile } = value;
  try {
    let userExist = await getOneUser({ where: { username } });
    if (userExist) {
      return SendResponse(res, 400, { message: "Username already exist" });
    }
    let userExistForEmail = await getOneUser({ where: { email } });
    if (userExistForEmail) {
      return SendResponse(res, 400, { message: "Email already exist" });
    }
    const genSalt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, genSalt);

    const first_mobile = mobile[0];
    const user_address = address.full_address;
    const user_id = getRandomId();
    const user = await users.create({
      user_id,
      password: hashedPass,
      email,
      username,
      address: user_address,
      phone: first_mobile,
    });
    SendResponse(res, 200, { data: user });
  } catch (err) {
    SendResponse(res, 500, err);
  }
}

export async function login(req, res) {
  const { error, value } = validateReq(loginReq, req.body);
  if (error) {
    return SendResponse(res, 422, { message: error });
  }
  const { username, password } = value;
  const Op = Sequelize.Op;
  try {
    let { user_id: userId } = await getOneUser({
      attributes: ["user_id"],
      where: { [Op.or]: [{ username }, { email: username }] },
    });

    let cacheKey = `login:${userId}`;

    let start = Date.now();
    let cacheValue = await getCache(cacheKey);
    cacheValue ? logger.debug("From cache") : logger.debug("From db");

    let user = cacheValue
      ? cacheValue
      : await getOneUser({
          where: {
            user_id: userId,
          },
        });

    if (!cacheValue) {
      await setCache(cacheKey, user);
    }
    logger.debug(`Login time - ${Date.now() - start}`);
    if (!user) {
      return SendResponse(res, 403, { message: "Invalid username/email" });
    }
    start = Date.now();
    const validPass = await compareHash(user.password, password);
    logger.debug(`Compare time - ${Date.now() - start}`);
    if (!validPass) {
      return SendResponse(res, 403, {
        message: `Invalid password for ${username}`,
      });
    }
    SendResponse(res, 200, { data: user });
  } catch (err) {
    SendResponse(res, 500, err);
  }
}

export async function updateUser(req, res) {
  const { userId } = req.params;
  const { error, value } = validateReq(updateUserReq, { ...req.body, userId });
  if (error) {
    return SendResponse(res, 422, { message: error });
  }
  const { field, update_value } = value;
  const update_map = {
    username: {
      set: { username: update_value },
    },
    password: {
      set: { password: update_value },
    },
    email: {
      set: { email: update_value },
    },
  };
  const where_query = { user_id: userId };

  try {
    let query = { set: update_map[field].set, where: where_query };
    const user = await updateOneUser(query);
    SendResponse(res, 200, { data: user });
  } catch (err) {
    SendResponse(res, 500, err);
  }
}
