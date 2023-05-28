import express from "express";
import { getCoinValue } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/getCoin").get(getCoinValue);
export default userRouter;
