import mongoose from "mongoose";

const date = new Date();
date.setHours(date.getHours() + 9);

const feedSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Creator" },
  createdAt: { type: Date, default: date },
  feedType: {
    public: { type: String, default: "free", required },
    membership: { type: String, default: "" },
    price: { type: Number, default: 0 },
  },
  feedContent: { type: String, default: "", required: true },
  feedImages: [{ type: String, default: null }],
  likeQuatity: { type: Number, default: 0 },
  commentary: [{ type: mongoose.Schema.Types.ObjectId, ref: "FeedCommentary" }],
});

const Feed = mongoose.model("Feed", feedSchema);

export default Feed;
