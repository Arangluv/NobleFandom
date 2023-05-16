import mongoose from "mongoose";

const feedCommentarySchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "CardInfo" },
  createdAt: { type: Date, default: Date.now },
  content: {type: String, require: true},
  
});

const FeedCommentary = mongoose.model("FeedCommentary", feedCommentarySchema);

export default FeedCommentary;
