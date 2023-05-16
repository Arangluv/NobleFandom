import mongoose from "mongoose";

const cardInfoSchema = new mongoose.Schema({
  cardNumber: [{ type: Number }],
  brithDay: { type: string },
  cardExpiration: [{ type: Number }],
  cardSecreatNumber: { type: Number },
});

const CardInfo = mongoose.model("CardInfo", cardInfoSchema);

export default CardInfo;
