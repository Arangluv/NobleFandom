import axios from "axios";
import { jwtConfig } from "../configs/jwtConfig.js";
import { cookiesConfig } from "../configs/cookiesConfig.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import ApplicationForm from "../models/ApplicationForm.js";
import { createUser, tokenIssuance } from "../utils/userUtils.js";
import Creator from "../models/Creator.js";
export const googleLogin = async (req, res) => {
  const { access_token } = req.body;
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
  );
};

export const userJoin = async (req, res) => {
  const { email, username, password, userId } = req.body;
  try {
    const { token, tokenConfig } = await createUser(
      email,
      username,
      password,
      userId
    );
    return res
      .cookie(
        "token",
        { token },
        {
          ...tokenConfig,
        }
      )
      .status(200)
      .json({ message: "회원가입에 성공했습니다" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.exists({ email });
    const creatorExist = await Creator.exists({ email });

    if (!userExist && !creatorExist) {
      return res.status(404).json({ message: "유저가 존재하지 않습니다" });
    }
    if (userExist) {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ message: "유저를 찾는데 오류가 발생했습니다" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(404)
          .json({ message: "이메일 혹은 비밀번호가 일치하지 않습니다" });
      }
      const { _id } = user;
      const { token, tokenConfig } = tokenIssuance(_id);
      return res
        .cookie("token", token, {
          ...tokenConfig,
        })
        .status(200)
        .json({
          message: "로그인에 성공했습니다",
          username: user.username,
          userId: user.userId,
          userType: user.userType,
          profileImg: user.profileImg,
          backGroundImg: user.backGroundImg,
        });
    }
    if (creatorExist) {
      const creator = await Creator.findOne({ email });
      if (!creator) {
        return res
          .status(404)
          .json({ message: "유저를 찾는데 오류가 발생했습니다" });
      }
      const passwordMatch = await bcrypt.compare(password, creator.password);
      if (!passwordMatch) {
        return res
          .status(404)
          .json({ message: "이메일 혹은 비밀번호가 일치하지 않습니다." });
      }
      const { _id } = creator;
      const { token, tokenConfig } = tokenIssuance(_id);
      return res
        .cookie("token", token, {
          ...tokenConfig,
        })
        .status(200)
        .json({
          message: "로그인에 성공했습니다",
          username: creator.username,
          userId: creator.userId,
          userType: creator.userType,
          profileImg: creator.profileImg,
          backGroundImg: creator.backGroundImg,
        });
    }
  } catch (error) {
    return res
      .status(404)
      .json({ message: "로그인하는데 문제가 발생했습니다" });
  }
};
export const creatorRegister = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const { email, username, userId, password, snsInfo } = data;
  const evidence_files = req.files;
  try {
    // exist User Inspect
    const user = await User.findOne({ email });
    const creator = await Creator.findOne({ email });
    if (creator) {
      return res.status(404).json({ message: "이미 등록된 이메일입니다" });
    }
    if (!user) {
      // Create User
      const { token, tokenConfig, _id } = await createUser(
        email,
        username,
        password,
        userId
      );
      // Create Application Form
      await ApplicationForm.create({
        owner: _id,
        // snsInfo: [{ snsAccount: sns_account, snsId: sns_id }],
        snsInfo: [
          ...snsInfo.map((info) => {
            return {
              snsAccount: info.sns_account,
              snsId: info.sns_id,
            };
          }),
        ],
        evidenceUrl: evidence_files.map((file) => file.location),
      });
      return res
        .cookie("token", token, {
          ...tokenConfig,
        })
        .status(200)
        .json({ message: "크리에이터 신청서가 잘 접수됐습니다." });
    }
    // Creator Register 등록 시 이미 유저가 있는 경우
    const applicationForms = await ApplicationForm.findOne({ owner: user._id });
    if (applicationForms) {
      return res.status(404).json({ message: "이미 신청하였습니다" });
    }
    const { secretKey, options } = jwtConfig;
    const payload = {
      id: user._id.toString(),
    };
    const token = jwt.sign(payload, secretKey, options);
    const tokenConfig = cookiesConfig();
    console.log(tokenConfig);
    await ApplicationForm.create({
      owner: user._id,
      snsInfo: [
        ...snsInfo.map((info) => {
          return {
            snsAccount: info.sns_account,
            snsId: info.sns_id,
          };
        }),
      ],
      evidenceUrl: evidence_files.map((file) => file.location),
    });
    return res
      .cookie("token", token, {
        ...tokenConfig,
      })
      .status(200)
      .json({ message: "크리에이터 신청서가 잘 접수됐습니다." });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
export const tokenInspect = async (req, res) => {
  try {
    const { token } = req.cookies;
    const { secretKey } = jwtConfig;
    const data = jwt.verify(token, secretKey);
    const { id } = data;
    const user = await User.findById(id);
    if (user) {
      const { userType, username, userId, profileImg, backGroundImg } = user;
      return res
        .status(200)
        .json({ userType, username, userId, profileImg, backGroundImg });
    }
    const creator = await Creator.findById(id);
    if (creator) {
      const { userType, username, userId, profileImg, backGroundImg } = creator;
      return res
        .status(200)
        .json({ userType, username, userId, profileImg, backGroundImg });
    }
    return res.status(404).json({
      message: "토큰이 만료 또는 유효하지 않은 토큰이거나, 유저가 없습니다",
    });
  } catch (error) {
    console.log("Error");
    console.log(error);
    return res
      .status(404)
      .json({ message: "토큰 검사 중 오류가 발생했습니다." });
  }
};
