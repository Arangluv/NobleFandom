import express from "express";
import {
  adminInspect,
  inspectAccessToken,
  getRegister,
} from "../controllers/adminController.js";
import { inspectAdmin } from "../middleware/adminMiddleware.js";
const adminRouter = express.Router();

adminRouter.route("/admin-validation").get(adminInspect);
adminRouter.route("/access_token").post(inspectAccessToken);
adminRouter.route("/creator-register").get(inspectAdmin, getRegister);

export default adminRouter;
