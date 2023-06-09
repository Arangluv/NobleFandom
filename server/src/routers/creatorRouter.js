import express from "express";
import {
  getMessageSetting,
  getPlanData,
  postAddMembershipPlan,
  postEditMessageSetting,
  postEditPlan,
} from "../controllers/creatorController.js";

const creatorRouter = express.Router();

creatorRouter.route("/get-messagesetting").get(getMessageSetting);
creatorRouter.route("/post-edit-messagesetting").post(postEditMessageSetting);
creatorRouter.route("/add-membership-plan").post(postAddMembershipPlan);
creatorRouter.route("/get-plandata").get(getPlanData);
creatorRouter.route("/modify-plan").post(postEditPlan);
export default creatorRouter;
