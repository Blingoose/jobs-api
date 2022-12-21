import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../errors/index.js";
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { User } from "../models/User.js";
import bycript from "bcryptjs";

export const register = asyncWrapper(async (req, res, next) => {
  const { name, password, email } = req.body;

  const salt = await bycript.genSalt(10);
  const hashedPassword = await bycript.hash(password, salt);
  const tempUser = { name, email, password: hashedPassword };

  //   if (!name || !email || !password) {
  //     return next(new BadRequest("Please Provide name, email and password"));
  //   }
  const user = await User.create({ ...tempUser });
  res.status(StatusCodes.CREATED).json({ user });
});

export const login = asyncWrapper(async (req, res, next) => {
  res.send("login user");
});
