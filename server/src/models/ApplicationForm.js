import mongoose from "mongoose";

const applicationFormSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  snsInfo: [
    {
      snsAccount: { type: String, required: true },
      snsId: { type: String, required: true },
    },
  ],
  evidenceUrl: [{ type: String, required: true }],
  processed: { type: Boolean, default: false },
});

const ApplicationForm = mongoose.model(
  "ApplicationForm",
  applicationFormSchema
);

export default ApplicationForm;
