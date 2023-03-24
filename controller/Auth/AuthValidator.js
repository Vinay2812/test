import Joi from "joi"

export const registerReq = Joi.object({
    username: Joi.required(),
    password: Joi.required(),
    email: Joi.required(),
    address: Joi.object({
        state: Joi.optional(),
        city: Joi.required(),
        pincode: Joi.number().required(),
        full_address: Joi.string().required()
    }).required(),
    mobile: Joi.array().items(Joi.number()).max(10).min(1).required(),
}).required();

export const loginReq = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
}).required();

export const updateUserReq = Joi.object({
    userId: Joi.string().required(),
    field:  Joi.string().allow(...["email", "username", "password"]).required(),
    update_value: Joi.string().required(),
}).required();

