import { StatusCodes } from "http-status-codes";

export const errorHandlerMiddleware = (err, req, res, next) => {
  let customError = {
    //set defaults
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };

  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue);
    customError.msg = `Duplicate value entered for [${field}] field, choose another ${field}`;
    customError.statusCode = 400;
  }

  if (err.errors) {
    const field = Object.keys(err.errors);
    customError.msg = `Missing values for [${field}] fields, all values must be provided.`;
    customError.statusCode = 400;
  }

  // return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
  return res.status(customError.statusCode).json({ msg: customError.msg });
};
