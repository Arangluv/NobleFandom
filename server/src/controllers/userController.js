import { jwtConfig } from "../configs/jwtConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import NobleCoin from "../models/NobleCoin.js";
import User from "../models/User.js";
import Creator from "../models/Creator.js";
import aws from "aws-sdk";
import { awsImageUploadConfig } from "../configs/awsConfig.js";
import Alarm from "../models/Alarm.js";

aws.config.update({ ...awsImageUploadConfig });
const s3 = new aws.S3();

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

export const postEditProfile = async (req, res) => {
  try {
    const { data } = req.body;
    const userInfo = JSON.parse(data);
    const {
      username,
      userId,
      userDescription,
      userType,
      email,
      isDirty,
      deleteProfileImage,
      deleteBackgroundImage,
    } = userInfo;
    let profileUrl = null;
    let backgroundUrl = null;
    if (req.files?.user_profile) {
      profileUrl = req.files.user_profile[0].location;
    }
    if (req.files?.user_background) {
      backgroundUrl = req.files.user_background[0].location;
    }
    if (isDirty) {
      const usernameExist = await User.exists({ username });
      const userIdExist = await User.exists({ userId });
      const creatorNameExist = await Creator.exists({ username });
      const creatorIdExist = await Creator.exists({ userId });
      if (usernameExist || creatorNameExist) {
        return res.status(404).json({ message: "이미 존재하는 닉네임입니다" });
      }
      if (userIdExist || creatorIdExist) {
        return res.status(404).json({ message: "이미 존재하는 ID입니다" });
      }
    }
    if (deleteProfileImage) {
      const params = {
        Bucket: "noblefandomimage",
        Key: deleteProfileImage,
      };
      s3.deleteObject(params, function (error, data) {
        if (error) {
          console.log("err: ", error, error.stack);
        } else {
          console.log(data, " 프로필 이미지가 삭제 되었습니다.");
        }
      });
    }
    if (deleteBackgroundImage) {
      const params = {
        Bucket: "noblefandomimage",
        Key: deleteBackgroundImage,
      };
      s3.deleteObject(params, function (error, data) {
        if (error) {
          console.log("err: ", error, error.stack);
        } else {
          console.log(data, " 배경 이미지가 삭제 되었습니다.");
        }
      });
    }
    if (userType === "user") {
      const user = await User.findOne({ email });
      if (!user) {
        res
          .status(404)
          .json({ message: "유저정보를 수정하는데 유저를 찾을 수 없습니다" });
      }

      user.profileImg = profileUrl === null ? user.profileImg : profileUrl;
      user.backGroundImg =
        backgroundUrl === null ? user.backGroundImg : backgroundUrl;
      user.username = username;
      user.userId = userId;
      user.profileDescription = userDescription;
      await user.save();

      return res.status(200).json({
        username: user.username,
        userId: user.userId,
        profileImg: user.profileImg,
        backgroundImg: user.backGroundImg,
        profileDescription: user.profileDescription,
        socialOnly: user.socialOnly,
      });
    }

    if (userType === "creator") {
      const creator = await Creator.findOne({ email });
      if (!creator) {
        res
          .status(404)
          .json({ message: "유저정보를 수정하는데 유저를 찾을 수 없습니다" });
      }

      creator.profileImg =
        profileUrl === null ? creator.profileImg : profileUrl;
      creator.backGroundImg =
        backgroundUrl === null ? creator.backGroundImg : backgroundUrl;
      creator.username = username;
      creator.userId = userId;
      creator.profileDescription = userDescription;
      await creator.save();
      return res.status(200).json({
        username: creator.username,
        userId: creator.userId,
        profileImg: creator.profileImg,
        backgroundImg: creator.backGroundImg,
        profileDescription: creator.profileDescription,
        socialOnly: creator.socialOnly,
      });
    }
    return res.status(404).json({ message: "잘못된 접근입니다" });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "프로필을 변경하는데 문제가 밠행했습니다" });
  }
};

export const postChagePassword = async (req, res) => {
  try {
    const { changePassword, currentPassword, userType } = req.body;
    const { token } = req.cookies;
    const { secretKey } = jwtConfig;
    const userInfo = jwt.verify(token, secretKey);
    const { id } = userInfo;
    if (userType === "user") {
      const user = await User.findById(id);
      const isPassword = await bcrypt.compare(currentPassword, user.password);
      if (!isPassword) {
        return res
          .status(404)
          .json({ message: "현재 비밀번호가 맞지 않습니다" });
      }
      user.password = changePassword;
      await user.save();
      return res
        .status(200)
        .json({ message: "비밀번호 변경에 성공하였습니다" });
    }
    const creator = await Creator.findById(id);
    const isPassword = await bcrypt.compare(currentPassword, creator.password);
    if (!isPassword) {
      return res.status(404).json({ message: "현재 비밀번호가 맞지 않습니다" });
    }
    creator.password = changePassword;
    await creator.save();
    return res.status(200).json({ message: "비밀번호 변경에 성공하였습니다" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "비밀번호를 변경하는데 문제가 발생했습니다" });
  }
};

export const getAlarmsState = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { secretKey } = jwtConfig;
    const userInfo = jwt.verify(token, secretKey);
    const { id } = userInfo;

    const user = await User.findById(id);
    const creator = await Creator.findById(id);
    if (!user && !creator) {
      throw new Error("알람을 업데이트하는 과정에서 사용자를 찾을 수 없습니다");
    }
    if (user) {
      const alarms = {
        isNewAlarm: user.isNewAlarm,
        isNewMessage: user.isNewMessage,
      };
      return res.status(200).json({ alarms });
    }
    if (creator) {
      const alarms = {
        isNewAlarm: creator.isNewAlarm,
        isNewMessage: creator.isNewMessage,
      };
      return res.status(200).json({ alarms });
    }
    throw new Error("알람을 갱신하는데 문제가 발생했습니다");
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

export const postAlarmClick = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      user.isNewAlarm = false;
      await user.save();
      return res.status(200).send();
    }
    if (!user) {
      const creator = await Creator.findOne({ email });
      creator.isNewAlarm = false;
      await creator.save();
      return res.status(200).send();
    }
    throw new Error("알람 상태를 갱신하는데 문제가 발생했습니다");
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const postMessageClick = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      user.isNewMessage = false;
      await user.save();
      return res.status(200).send();
    }
    if (!user) {
      const creator = await Creator.findOne({ email });
      creator.isNewMessage = false;
      await creator.save();
      return res.status(200).send();
    }
    throw new Error("알람 상태를 갱신하는데 문제가 발생했습니다");
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const getAlarms = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { secretKey } = jwtConfig;
    const userInfo = jwt.verify(token, secretKey);
    const { id } = userInfo;
    const user = await User.findById(id).populate("alarms");
    if (user) {
      const { alarms } = user;
      return res.status(200).json({ alarms });
    }
    if (!user) {
      const creator = await Creator.findById(id).populate("alarms");
      const { alarms } = creator;
      return res.status(200).json({ alarms });
    }
    throw new Error("알람을 갱신하는데 문제가 발생했습니다");
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const deleteAlarm = async (req, res) => {
  const { deleteId, owner } = req.body;
  try {
    const alarm = await Alarm.findOneAndUpdate(
      { owner },
      { $pull: { alarms: { _id: deleteId } } }
    );
    console.log(alarm);
    return res.status(200).send();
  } catch (error) {
    return res.status(404).send();
  }

  // const alarm = await Alarm.findOne({ alarms });
};
export const getPersonalScreenUserData = async (req, res) => {
  try {
    const { userId: paramsUserId } = req.query;
    const creator = await Creator.findOne({ userId: paramsUserId });
    if (creator) {
      const {
        userId,
        profileImg,
        backGroundImg,
        profileDescription,
        follower,
        username,
        membershipPlan,
      } = creator;
      return res.status(200).json({
        userId,
        profileImg,
        backGroundImg,
        profileDescription,
        follower,
        username,
        membershipPlan,
      });
    }
    if (!creator) {
      const user = await User.findOne({ userId: paramsUserId });
      console.log(user);
      const {
        userId,
        profileImg,
        backGroundImg,
        profileDescription,
        follower,
      } = user;
      return res.status(200).json({
        userId,
        profileImg,
        backGroundImg,
        profileDescription,
        follower,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ messasge: error.message });
  }
};
