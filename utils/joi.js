import logger from "./logger.js";

export function validateReq(schema, data) {
  return schema.validate(data, { abortEarly: false, allowUnknown: true });
}
