import mongoose from "mongoose";

const refundInfoSchema = new mongoose.Schema({
  AccountKorName: { type: String, required: true },
  AccountEngName: { type: String, required: true },
  address: { type: String, required: true },
  email: { type: String, required: true },
  bankName: { type: String, required: true },
  backAccount: { type: String, required: true },
});

const RefundInfo = mongoose.model("RefundInfo", refundInfoSchema);

export default RefundInfo;
