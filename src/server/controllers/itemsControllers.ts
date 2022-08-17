import { NextFunction, Request, Response } from "express";
import Item from "../../database/models/Items";
import CustomError from "../../utils/CustomError";

export const getAllItems = async (req: Request, res: Response) => {
  const items = await Item.find();

  console.log(Item.find());
  res.status(200).json({ items });
};

export const createItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const item = req.body;

  try {
    const newItem = await Item.create(item);

    res.status(201).json({ item: newItem });
  } catch (error) {
    const customError = new CustomError(
      400,
      error.message,
      "Error creating new robot"
    );
    next(customError);
  }
};
