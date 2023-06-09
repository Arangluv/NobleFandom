import mongoose from "mongoose";

const membershipPlanSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "Creator" },
  planName: { type: String },
  planContent: { type: String },
  planPrice: { type: Number, required: true },
  planBenefits: {
    period: { type: Boolean, default: false },
    freeMessage: {
      allow: { type: Boolean, default: false },
      pricePerMsg: { type: Number, default: 0 },
    },
    userRequestion: { type: Boolean, default: false },
  },
});

const MembershipPlan = mongoose.model("MembershipPlan", membershipPlanSchema);

export default MembershipPlan;
