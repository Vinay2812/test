import mssql from "../connections/mssql-connection.js";
import { registerReq } from "../validator/AuthValidator.js";
import { internalServerError, joiErrRes, validateReq } from "../utils/joi.js";
import { users } from "../models/User.js";
import { getRandomId } from "../utils/random.js"
import { getUserByUsername, sync } from "./helpers.js";

export async function register(req, res) {
  const { error, value } = validateReq(registerReq, req.body);
  if(error){
    return joiErrRes(res, error);
  }
  const { username, password, email, address, mobile } = value;
  try {
    let userExist = await getUserByUsername(username);
    if(userExist){
        return res.status(400).json({message: "User already exist"})
    }
    const first_mobile = mobile[0];
    const user_address = address.full_address;
    const user_id = getRandomId();
    const user = await users.create({
        user_id,
        password,
        email,
        username,
        address: user_address,
        phone: first_mobile
    })
    res.status(200).json({data: user});
  } catch (err) {
    internalServerError(res, err);
  }
}

export async function login(req, res) {}

