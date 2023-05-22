import mongoose from "mongoose";

const NobleCoinSchema = new mongoose.Schema({
  coinOwner: { type: mongoose.Schema.Types.ObjectId },
  coinQuantity: { type: Number, default: 0 },
  coinGetLog: [{ type: String }],
});

const NobleCoin = mongoose.model("NobleCoin", NobleCoinSchema);

export default NobleCoin;
