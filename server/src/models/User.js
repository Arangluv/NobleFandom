import mongoose from "mongoose";
import bcrypt from "bcrypt";
import moment from "moment";

const date = new Date();
date.setHours(date.getHours() + 9);

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  userType: { type: String, default: "user" },
  password: { type: String }, // ok
  socialOnly: { type: Boolean, default: false }, // ok
  userId: { type: String, required: true }, // ok
  profileImg: { type: String, default: null }, // ok
  backGroundImg: { type: String, default: null }, // ok
  adultCertification: { type: Boolean, default: false }, // ok
  profileDescription: { type: String, default: "" }, // ok
  approved: { type: Boolean, default: false }, // ok
  isNewAlarm: { type: Boolean, default: false }, // ok
  isNewMessage: { type: Boolean, default: false }, // ok
  paidCardInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CardInfo",
    default: null,
  }, // ok
  follower: [{ type: mongoose.Schema.Types.ObjectId }], // ok
  likedFeed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feed" }], // ok
  alarms: { type: mongoose.Schema.Types.ObjectId, ref: "Alarm" }, // ok
  request: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }], // ok
  createdAt: { type: Date, default: date },
  nobleCoin: { type: mongoose.Schema.Types.ObjectId, ref: "NobleCoin" },
  chat: {
    chatting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
    },
    chatWith: [{ type: mongoose.Schema.Types.ObjectId }], // 메세지를 주고 받은 사람들
  }, //ok
  createdAt: { type: Date, default: date },
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});
const User = mongoose.model("User", userSchema);

export default User;
