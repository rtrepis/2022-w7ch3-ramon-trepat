import express from "express";
import { createItem, getAllItems } from "../controllers/itemsControllers";
import authentication from "../middlewares/authentication";

const itemsRouter = express.Router();

itemsRouter.get("/", authentication, getAllItems);
itemsRouter.post("/create", createItem);

export default itemsRouter;
