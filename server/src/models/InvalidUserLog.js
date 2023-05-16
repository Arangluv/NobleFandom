import mongoose from "mongoose";
import User from "./User.js";
import Creator from "./Creator.js";
import { jwtConfig } from "../configs/jwtConfig.js";
import jwt from "jsonwebtoken";
const InvalidUserLogSchema = new mongoose.Schema({
  accessLogToken: { type: String, required: true },
  message: { type: String, required: true },
  username: { type: String, default: "" },
  userId: { type: String, default: "" },
  email: { type: String, default: "" },
});

InvalidUserLogSchema.pre("save", async function () {
  const { secretKey } = jwtConfig;
  const userInformation = jwt.verify(this.accessLogToken, secretKey);
  const { id } = userInformation;
  const user = await User.findById(id);
  const creator = await Creator.findById(id);
  if (!user) {
    this.username = creator.username;
    this.userId = creator.userId;
    this.email = creator.email;
  }
  if (!creator) {
    this.username = user.username;
    this.userId = user.userId;
    this.email = user.email;
  }
});

const InValidUserLog = mongoose.model("InValidUserLog", InvalidUserLogSchema);

export default InValidUserLog;
