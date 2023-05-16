import mongoose from "mongoose";

const AlarmSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  createdAt: { type: Date, default: Date.now },
  alarmContent: { type: String, required: true },
});

const Alarm = mongoose.model("Alarm", AlarmSchema);

export default Alarm;
