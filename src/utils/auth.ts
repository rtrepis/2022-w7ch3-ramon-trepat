import "../loadEnvironment";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IpayLoad } from "../server/types/userType";

export const createToken = (payLoad: IpayLoad) =>
  jwt.sign(payLoad, process.env.KEY);

export const verifyToken = (token: string) =>
  jwt.verify(token, process.env.KEY);

export const hashCreator = (text: string) => {
  const salt = 10;
  return bcrypt.hash(text, salt);
};

export const hashCompare = (text: string, hash: string) => {
  return bcrypt.compare(text, hash);
};
