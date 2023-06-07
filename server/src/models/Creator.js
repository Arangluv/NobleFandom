import mongoose from "mongoose";
import bcrypt from "bcrypt";

const date = new Date();
date.setHours(date.getHours() + 9);

const creatorSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  userType: { type: String, default: "creator" },
  password: { type: String, required: true },
  socialOnly: { type: Boolean, default: false },
  userId: { type: String, require: true },
  profileImg: { type: String, default: null },
  backGroundImg: { type: String, default: null },
  adultCertification: { type: Boolean, default: false },
  profileDescription: { type: String, default: "" },
  approved: { type: Boolean, default: false },
  isNewAlarm: { type: Boolean, default: false },
  isNewMessage: { type: Boolean, default: false },
  paidCardInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CardInfo",
    default: null,
  },
  refundInfo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RefundInfo",
    default: null,
  },
  nobleCoin: { type: mongoose.Schema.Types.ObjectId, ref: "Coin" },
  follower: [{ type: mongoose.Schema.Types.ObjectId }],
  following: [{ type: mongoose.Schema.Types.ObjectId }],
  blockUser: [{ type: mongoose.Schema.Types.ObjectId }],
  likedFeed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feed" }],
  alarms: { type: mongoose.Schema.Types.ObjectId, ref: "Alarm" },
  vipUser: [{ type: mongoose.Schema.Types.ObjectId }],
  membershipPlan: [
    { type: mongoose.Schema.Types.ObjectId, ref: "MembershipPlan" },
  ],
  messageSetting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "MessageSetting",
  },
  feed: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feed" }],
  request: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
  createdAt: { type: Date, default: date },
  chat: {
    chatting: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      default: null,
    },
    chatWith: [{ type: mongoose.Schema.Types.ObjectId }], // 메세지를 주고 받은 사람들
  },
});
const Creator = mongoose.model("Creator", creatorSchema);

export default Creator;
