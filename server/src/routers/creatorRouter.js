import express from "express";
import {
  getMessageSetting,
  postEditMessageSetting,
} from "../controllers/creatorController.js";

const creatorRouter = express.Router();

creatorRouter.route("/get-messagesetting").get(getMessageSetting);
creatorRouter.route("/post-edit-messagesetting").post(postEditMessageSetting);
export default creatorRouter;
