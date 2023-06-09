import { jwtConfig } from "../configs/jwtConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Creator from "../models/Creator.js";
import MessageSetting from "../models/MessageSetting.js";
import MembershipPlan from "../models/MembersipPlan.js";

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

export const postAddMembershipPlan = async (req, res) => {
  console.log(req.body);
  try {
    const { token } = req.cookies;
    const {
      benefits_period,
      benefits_msg,
      benefits_request,
      membershipDescription,
      membershipName,
      membership_price,
      paid_message_value,
    } = req.body;
    const { secretKey } = jwtConfig;
    const creatorInfo = await jwt.verify(token, secretKey);
    const { id } = creatorInfo;
    const creator = await Creator.findById(id);
    if (!creator) {
      throw new Error(
        "맴버쉽 플랜을 저장하는 도중 크리에이터를 찾을 수 없습니다"
      );
    }
    if (creator.membershipPlan.length === 3) {
      throw new Error("플랜은 최대 3개까지 가질 수 있습니다");
    }

    const createPlan = await MembershipPlan.create({
      owner: creator._id,
      planName: membershipName,
      planContent: membershipDescription,
      planPrice: membership_price,
      planBenefits: {
        period: benefits_period === "publish_30days" ? true : false,
        freeMessage: {
          allow: benefits_msg === "free_msg_ok" ? true : false,
          pricePerMsg: paid_message_value,
        },
        userRequestion: benefits_request === "request_ok" ? true : false,
      },
    });
    creator.membershipPlan.push(createPlan._id);
    await creator.save();
    return res.status(200).json({ message: "성공적으로 저장하였습니다" });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const getPlanData = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { secretKey } = jwtConfig;
    const creatorInfo = await jwt.verify(token, secretKey);
    const { id } = creatorInfo;
    const creator = await Creator.findById(id).populate("membershipPlan");
    if (!creator) {
      throw new Error("멤버쉽을 불러오는 도중 크리에이터를 찾을 수 없습니다");
    }
    return res.status(200).json({ data: creator.membershipPlan });
  } catch (error) {
    console.log(error);
    if (
      (error.message = "멤버쉽을 불러오는 도중 크리에이터를 찾을 수 없습니다")
    ) {
      return res
        .cookie("token", token, {
          maxAge: 0,
        })
        .json({ message: error.message + " 다시 로그인해주세요" });
    }
    return res.status(404).json({ message: error.message });
  }
};

export const postEditPlan = async (req, res) => {
  try {
    const { planName, planContent, planId } = req.body;
    const { token } = req.cookies;
    const { secretKey } = jwtConfig;
    const creatorInfo = await jwt.verify(token, secretKey);
    const { id } = creatorInfo;
    await MembershipPlan.findOneAndUpdate(
      {
        owner: id,
        _id: planId,
      },
      { planName, planContent }
    );
    return res.status(200).send();
  } catch (error) {
    return res
      .status(404)
      .json({ message: "플랜을 수정하는데 문제가 발생했습니다" });
  }
};
