import mongoose from "mongoose";

const date = new Date();
date.setHours(date.getHours() + 9);

const chatFreeContentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  content: { type: String, required: true },
  createdAt: { type: Date, default: date },
});

const ChatFreeContent = mongoose.model(
  "ChatFreeContent",
  chatFreeContentSchema
);

export default ChatFreeContent;
