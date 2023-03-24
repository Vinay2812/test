import { users, users_data, user_otp_details } from "../models/User.js"
import logger from "./logger.js";

export default async function sync(){
    const config = {
        freezeTableName: true,
        alter: false,
        force: false,
    }
    try {
        await users.sync(config);
    } catch (err) {
        logger.error("Failed to sync users" + err);
    }

    try {
        await user_otp_details.sync(config);
    } catch (err) {
        logger.error("Failed to sync user otp details" + err);
    }

    try {
        await users_data.sync(config);
    } catch (err) {
        logger.error("Failed to sync user otp details" + err);
    }
}