import crypto from "crypto";
import { v4 as uuidv4 } from "uuid";

export function getRandomId(){
    return uuidv4();
}

export function getRandomOtp(){
    let otp = "";
    for(let i=0;i<6;i++){
        otp += Math.floor(Math.random()*10).toString();
    }
    return otp;
}