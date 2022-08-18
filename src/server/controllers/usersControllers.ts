import { NextFunction, Request, Response } from "express";
import User from "../../database/models/Users";
import { createToken, hashCompare, hashCreator } from "../../utils/auth";
import CustomError from "../../utils/CustomError";
import { IpayLoad, IUser } from "../types/userType";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = req.body;

  const payLoad: IpayLoad = {
    id: "223345533",
    userName: "llili",
  };

  const userError = new CustomError(
    403,
    "User not found",
    "User o password incorrect"
  );

  let findUser: Array<IUser>;

  try {
    findUser = await User.find({ userName: user.userName });

    if (findUser.length === 0) {
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}`,
      `message:${(error as Error).message}`
    );

    next(finalError);
  }

  try {
    const isPasswordValid = await hashCompare(
      user.password,
      findUser[0].password
    );

    if (!isPasswordValid) {
      userError.message = "password invalit";
      next(userError);
      return;
    }
  } catch (error) {
    const finalError = new CustomError(
      403,
      `name: ${(error as Error).name}`,
      `message:${(error as Error).message}`
    );

    next(finalError);
  }

  const responseData = { user: { token: createToken(payLoad) } };

  res.status(200).json(responseData);
};

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = req.body;

  user.password = await hashCreator(user.password);

  try {
    const newUser = await User.create(user);
    res.status(201).json({ user: newUser });
  } catch (error) {
    const userError = new CustomError(
      400,
      "Error creating new user - public",
      error.message
    );
    next(userError);
  }
};

export default loginUser;
