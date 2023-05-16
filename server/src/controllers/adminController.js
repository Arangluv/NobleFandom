import { jwtConfig } from "../configs/jwtConfig.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApplicationForm from "../models/ApplicationForm.js";
import InValidUserLog from "../models/InvalidUserLog.js";
import dotenv from "dotenv";
dotenv.config();

export const adminInspect = async (req, res) => {
  if (Object.keys(req.cookies).length === 0) {
    // 쿠키가 비었을 경우
    return res.status(404).json({ message: "로그인 후 이용해주세요" });
  }
  try {
    const { token } = req.cookies.token;
    const { secretKey } = jwtConfig;
    const userInformation = jwt.verify(token, secretKey);
    const { id } = userInformation;
    const user = await User.findById(id);
    if (!user) {
      await InValidUserLog.create({
        accessLogToken: token,
        message: "존재하지 않는 유저",
      });
      return res.status(404).json({ message: "존재하지 않은 유저입니다" });
    }
    if (user.userType !== "admin_arange") {
      await InValidUserLog.create({
        accessLogToken: token,
        message: "user가 어드민이 아님",
      });
      return res.status(404).json({ message: "권한이 없습니다" });
    }
    if (
      user.username === "노블팬덤 공식계정" &&
      user.email === "noblefandom@gmail.com"
    ) {
      return res.status(200).json({ message: "1차 admin 인증에 성공했습니다" });
    }
    await InValidUserLog.create({
      accessLogToken: token,
      message: "username과 email이 설정값과 다름",
    });
    return res.status(404).json({ message: "admin 인증에 실패했습니다" });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(404).json({ message: "토큰이 만료되었습니다" });
    }
    return res.status(404).json({ message: "유효하지 않은 토큰입니다" });
  }
};

export const inspectAccessToken = async (req, res) => {
  const { access_token } = req.body;
  try {
    if (access_token !== process.env.ACCESS_TOKEN_TO_ADMIN_PAGE) {
      const { token } = req.cookies.token;
      await InValidUserLog.create({
        accessLogToken: token,
        message: "토큰 입력 실패",
      });
      return res.status(404).json({ message: "토큰이 일치하지 않습니다" });
    }
    return res.status(200).json({ message: "관리자 로그인에 성공했습니다" });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "토큰 검사시 문제가 발생했습니다." });
  }
};

export const getRegister = async (req, res) => {
  try {
    const register = await ApplicationForm.find({});
    return res.status(200).json({ register });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "크리에이터 신청서를 찾는데 문제가 발생했습니다" });
  }
};
