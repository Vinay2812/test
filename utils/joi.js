import logger from "./logger.js";

export function validateReq(schema, data) {
  return schema.validate(data, { abortEarly: false, allowUnknown: true });
}

export function joiErrRes(res, err) {
  logger.error(err);
  return res.status(422).json({
    message: err,
  });
}

export function internalServerError(res, err) {
  logger.error(err);
  return res.status(500).json({
    message: "Internal Server Error\n" + err,
  });
}
