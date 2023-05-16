import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  userType: { type: String, default: "user" },
  password: { type: String, required: true }, // ok
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
  alarms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alarm" }], // ok
  request: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }], // ok
  createdAt: { type: Date, default: Date.now },
  nobleCoin: { type: mongoose.Schema.Types.ObjectId, ref: "Coin" },
  chat: {
    chatting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
    },
    chatWith: [{ type: mongoose.Schema.Types.ObjectId }], // 메세지를 주고 받은 사람들
  }, //ok
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
});
const User = mongoose.model("User", userSchema);

export default User;