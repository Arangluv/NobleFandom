import mongoose from "mongoose";

const date = new Date();
date.setHours(date.getHours() + 9);

const MessageSettingSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Creator",
    required: true,
  },
  publicRecive: { type: Boolean, default: true },
  freeMessageQuantuty: { type: Number, default: 5 },
  coinPerMessage: { type: Number, default: 1 },
  initSubscriptionMessage: { type: String, default: "" },
});

const MessageSetting = mongoose.model("MessageSetting", MessageSettingSchema);

export default MessageSetting;
