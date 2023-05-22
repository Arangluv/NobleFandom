import mongoose from "mongoose";

const AlarmSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId },
  alarms: [
    {
      sender: {
        userId: { type: String, required: true },
        userProfileImg: { type: String, required: true },
      },
      content: { type: String, required: true },
      createdAt: { type: Date, required: true },
    },
  ],
});

const Alarm = mongoose.model("Alarm", AlarmSchema);

export default Alarm;
