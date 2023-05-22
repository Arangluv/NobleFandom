import express from "express";
import {
  adminInspect,
  inspectAccessToken,
} from "../controllers/adminController/adminController.js";
import {
  getRegister,
  postApprove,
  postRegiserDelete,
  postReject,
} from "../controllers/adminController/creatorRegiser.js";
import { inspectAdmin } from "../middleware/adminMiddleware.js";
const adminRouter = express.Router();

adminRouter.route("/admin-validation").get(adminInspect);
adminRouter.route("/access_token").post(inspectAccessToken);
adminRouter.route("/creator-register").get(inspectAdmin, getRegister);
adminRouter.route("/approve").post(postApprove);
adminRouter.route("/register-reject").post(postReject);
adminRouter.route("/deleteRegister").post(postRegiserDelete);
export default adminRouter;
