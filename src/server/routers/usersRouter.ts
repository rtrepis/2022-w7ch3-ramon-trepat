import express from "express";
import loginUser, { registerUser } from "../controllers/usersControllers";

const usersRouter = express.Router();

usersRouter.get("/login", loginUser);
usersRouter.post("/register", registerUser);

export default usersRouter;
