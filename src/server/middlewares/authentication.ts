import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../../utils/auth";
import createCustomError from "../../utils/errors";

interface IcustomRequest extends Request {
  payLoad: JwtPayload;
}

const authentication = (
  req: IcustomRequest,
  res: Response,
  next: NextFunction
) => {
  const dataAuthentication = req.get("Authentication");
  const error = createCustomError(
    400,
    "Unauthorized user",
    "A user wants to enter without authorization"
  );

  if (!dataAuthentication || !dataAuthentication.startsWith("Bearer ")) {
    next(error);
    return;
  }

  const token = dataAuthentication.slice(7);
  const tokenVerify = verifyToken(token);

  if (typeof tokenVerify === "string") {
    next(error);
  }

  req.payLoad = tokenVerify as JwtPayload;
  next();
};

export default authentication;
