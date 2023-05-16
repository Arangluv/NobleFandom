import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, required: true }, // 메세지의 주인
  msgTarget: { type: mongoose.Schema.Types.ObjectId, required: true }, // 현재 메세지를 받은 사람
  msgContent: [{ type: mongoose.Schema.Types.ObjectId }], // FreeContent일수도 PremiumContent 일수도
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
