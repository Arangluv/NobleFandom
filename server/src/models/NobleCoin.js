import mongoose from "mongoose";
import bcrypt from "bcrypt";

const NobleCoinSchema = new mongoose.Schema({
  coinQuantity: { type: Number, default: 0 },
  coinOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  coinGetLog: [{ type: String }],
});

const NobleCoin = mongoose.model("NobleCoin", NobleCoinSchema);

export default NobleCoin;
