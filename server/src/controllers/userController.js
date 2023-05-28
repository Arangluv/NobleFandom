import { jwtConfig } from "../configs/jwtConfig.js";
import jwt from "jsonwebtoken";
import NobleCoin from "../models/NobleCoin.js";

export const getCoinValue = async (req, res) => {
  const { token } = req.cookies;
  try {
    if (!token) {
      throw new Error("코인을 불러오는 도중 토큰을 확인할 수 없습니다.");
    }
    const { secretKey } = jwtConfig;
    const verified = jwt.verify(token, secretKey);
    const { id } = verified;
    console.log(id);
    const coin = await NobleCoin.findOne({ coinOwner: id });
    if (!coin) {
      throw new Error("코인을 찾을 수 없습니다.");
    }
    return res.status(200).json({ coinQuantity: coin.coinQuantity });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
