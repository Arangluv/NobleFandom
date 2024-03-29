import mongoose from "mongoose";

const date = new Date();
date.setHours(date.getHours() + 9);

const chatPremiumContentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  images: [{ type: String, required: true }],
  content: { type: String, required: true },
  price: { type: number, required: true, default: 0 },
  createdAt: { type: Date, default: date },
});

const ChatPremiumContent = mongoose.model(
  "ChatPremiumContent",
  chatPremiumContentSchema
);

export default ChatPremiumContent;
