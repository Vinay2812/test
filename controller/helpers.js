import { users } from "../models/User.js";

export async function sync(table){
    await table.sync({alter: true});
}
export async function getUserByUsername(username){
    const user = await users.findOne({where: {
        username: username
    }});
    return user;
}

export async function getUserByEmail(email){
    const user = await users.findOne({where: {
        email
    }});
    return user;
}