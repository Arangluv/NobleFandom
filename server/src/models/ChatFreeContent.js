import mongoose from "mongoose";

const chatFreeContentSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const ChatFreeContent = mongoose.model(
  "ChatFreeContent",
  chatFreeContentSchema
);

export default ChatFreeContent;
