import { jwtConfig } from "../configs/jwtConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Creator from "../models/Creator.js";
import MessageSetting from "../models/MessageSetting.js";

export const getMessageSetting = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { secretKey } = jwtConfig;
    const { id } = await jwt.verify(token, secretKey);
    const creator = await Creator.findById(id).populate("messageSetting");
    if (!creator) {
      throw new Error("메세지 세팅을 불러오는 도중 오류가 발생했습니다");
    }
    return res.status(200).json({ messageSetting: creator.messageSetting });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const postEditMessageSetting = async (req, res) => {
  try {
    const {
      freeMessageQuantuty,
      coinPerMessage,
      subscriptionMessage,
      isReceiveAll,
      _id,
    } = req.body;
    console.log("Req body ?");
    console.log(req.body);
    const messageSetting = await MessageSetting.findById(_id);
    messageSetting.publicRecive = isReceiveAll;
    messageSetting.freeMessageQuantuty = freeMessageQuantuty;
    messageSetting.coinPerMessage = coinPerMessage;
    messageSetting.initSubscriptionMessage = subscriptionMessage;
    await messageSetting.save();
    return res.status(200).send();
  } catch (error) {
    console.log("Error Message ?");
    console.log(error.message);
    console.log("Error?");
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};
