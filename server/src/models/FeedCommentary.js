import mongoose from "mongoose";

const date = new Date();
date.setHours(date.getHours() + 9);

const feedCommentarySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "CardInfo" },
  createdAt: { type: Date, default: date },
  content: { type: String, require: true },
});

const FeedCommentary = mongoose.model("FeedCommentary", feedCommentarySchema);

export default FeedCommentary;
