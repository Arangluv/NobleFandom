import mongoose from "mongoose";

const date = new Date();
date.setHours(date.getHours() + 9);

const requestSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId },
  reciver: { type: mongoose.Schema.Types.ObjectId, ref: "Creator" },
  requestContent: { type: String, required: true },
  requestPrice: { type: Number, required: true },
  createdAt: { type: Date, default: date },
  response: {
    allow: { type: Boolean, default: false },
    content: { type: mongoose.Schema.Types.ObjectId, ref: "Feed" },
  },
});

const Request = mongoose.model("Request", requestSchema);

export default Request;
