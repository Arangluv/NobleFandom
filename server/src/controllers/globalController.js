import axios from "axios";
import { jwtConfig } from "../configs/jwtConfig.js";
import jwt from "jsonwebtoken";
import { cookiesConfig } from "../configs/cookiesConfig.js";
import bcrypt from "bcrypt";
import User from "../models/User.js";
import ApplicationForm from "../models/ApplicationForm.js";
import { createUser, tokenIssuance } from "../utils/userUtils.js";
import Creator from "../models/Creator.js";
import NobleCoin from "../models/NobleCoin.js";
import Alarm from "../models/Alarm.js";
import * as nodemailer from "nodemailer";
export const googleLogin = async (req, res) => {
  const { access_token, userId, username } = req.body;
  try {
    if (!access_token) {
      throw new Error("구글 로그인을 처리하는데 문제가 발생했습니다");
    }
    const { data } = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`
    );
    // 유저가 있는지 검사, 없으면 계정을 만들고 로그인 시킨다
    const user = await User.findOne({
      socialOnly: true,
      email: data.email,
    });
    const creator = await Creator.findOne({
      socialOnly: true,
      email: data.email,
    });
    // 유저가 없는 경우 (일반유저 + 크리에이터)
    if (!user && !creator) {
      const user = await User.create({
        email: data.email,
        socialOnly: true,
        username: `fan_${username}`,
        userId: userId,
        isNewAlarm: true,
        isNewMessage: true,
      });
      const { _id } = user;
      const nobleCoin = await NobleCoin.create({
        coinOwner: _id,
      });
      user.nobleCoin = nobleCoin;
      const alarms = await Alarm.create({
        owner: _id,
        alrams: [],
      });
      const newAlarm = {
        sender: {
          userId: "noblefandom_official",
          userProfileImg:
            "https://cdn.icon-icons.com/icons2/37/PNG/512/administrator_3552.png",
        },
        content: "가입을 환영합니다",
        createdAt: Date.now(),
      };
      alarms.alarms.push(newAlarm);
      alarms.save();
      user.alarms = alarms;
      await user.save();
      const { secretKey, options } = jwtConfig;
      const payload = {
        id: _id.toString(),
      };
      const token = jwt.sign(payload, secretKey, options);
      const tokenConfig = cookiesConfig();
      return res
        .cookie("token", token, { ...tokenConfig })
        .status(200)
        .json({
          username: user.username,
          userType: "user",
          userId: user.userId,
          backGroundImg: null,
          profileImg: null,
          profileDescription: user.profileDescription,
          email: user.email,
          socialOnly: true,
        });
    }
    // 일반유저 유저인
    if (user && !creator) {
      const { secretKey, options } = jwtConfig;
      const payload = {
        id: user._id.toString(),
      };
      const token = jwt.sign(payload, secretKey, options);
      const tokenConfig = cookiesConfig();
      return res
        .cookie("token", token, { ...tokenConfig })
        .status(200)
        .json({
          username: user.username,
          userType: user.userType,
          userId: user.userId,
          backGroundImg: user.backGroundImg,
          profileImg: user.profileImg,
          email: user.email,
          profileDescription: user.profileDescription,
          socialOnly: true,
        });
    }
    if (creator && !user) {
      const { secretKey, options } = jwtConfig;
      const payload = {
        id: creator._id.toString(),
      };
      const token = jwt.sign(payload, secretKey, options);
      const tokenConfig = cookiesConfig();
      return res
        .cookie("token", token, { ...tokenConfig })
        .status(200)
        .json({
          username: creator.username,
          userType: creator.userType,
          userId: creator.userId,
          backGroundImg: creator.backGroundImg,
          profileImg: creator.profileImg,
          email: creator.email,
          profileDescription: creator.profileDescription,
          socialOnly: true,
        });
    }
    return res.status(404).json({ message: "구글로그인에 실패했습니다" });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
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
      .json({
        message: "회원가입에 성공했습니다",
        username,
        userId,
        profileImg: null,
        backGroundImg: null,
        userType: "user",
        email,
        profileDescription: "",
        socialOnly: false,
      });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userExist = await User.exists({ email, socialOnly: false });
    const creatorExist = await Creator.exists({ email, socialOnly: false });

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
          email: user.email,
          profileDescription: user.profileDescription,
          socialOnly: user.socialOnly,
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
          email: creator.email,
          profileDescription: creator.profileDescription,
          socialOnly: creator.socialOnly,
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
    if (!token) {
      return res.status(200).json({
        userType: "",
        userId: "",
        username: "",
        profileImg: null,
        backGroundImg: null,
        socialOnly: false,
        profileDescription: "",
        email: "",
      });
    }
    const { secretKey } = jwtConfig;
    const data = jwt.verify(token, secretKey);
    const { id } = data;
    const user = await User.findById(id);
    if (user) {
      const {
        userType,
        username,
        userId,
        profileImg,
        backGroundImg,
        email,
        profileDescription,
        socialOnly,
      } = user;
      return res.status(200).json({
        userType,
        username,
        userId,
        profileImg,
        backGroundImg,
        email,
        profileDescription,
        socialOnly,
      });
    }
    const creator = await Creator.findById(id);
    if (creator) {
      const {
        userType,
        username,
        userId,
        profileImg,
        backGroundImg,
        email,
        profileDescription,
        socialOnly,
      } = creator;
      return res.status(200).json({
        userType,
        username,
        userId,
        profileImg,
        backGroundImg,
        email,
        profileDescription,
        socialOnly,
      });
    }
    return res.status(204).json({
      message: "토큰이 만료 또는 유효하지 않은 토큰이거나, 유저가 없습니다",
    });
  } catch (error) {
    console.log("Error : globalController, tokenInspect");
    console.log(error);
    return res
      .status(404)
      .json({ message: "토큰 검사 중 오류가 발생했습니다." });
  }
};

export const userLogout = async (req, res) => {
  try {
    return res
      .clearCookie("token")
      .status(200)
      .json({ message: "로그아웃에 성공했습니다" });
  } catch (error) {
    res.status(404).json({ message: "로그아웃을 처리하는데 실패했습니다" });
  }
};
export const postUserFind = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("유저가 없습니다");
    }
    return res.status(200).json({ message: "유저가 있습니다", email });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
export const postPasswordFind = async (req, res) => {
  try {
    const { authNumber } = req.body;
    console.log(authNumber);
    const smtpTransport = nodemailer.createTransport({
      service: "naver",
      host: "smtp.naver.com", // SMTP 서버명
      port: 465, // SMTP 포트
      auth: {
        user: "bobobe3@naver.com", // mail 발송 이메일 주소
        pass: "ru09457295@!", // 해당 이메일 비밀번호
      },
      // tls: {
      //   rejectUnauthorized: false,
      // },
    });

    const mailOptions = {
      from: "bobobe3@naver.com", // 발송 주체
      to: "ruhunsu3@naver.com", // 인증을 요청한 이메일 주소
      subject: "[NobleFandom] 이메일 확인 인증번호 안내", // 이메일 제목
      text: `아래 인증번호를 확인하여 이메일 주소 인증을 완료해 주세요.\n
    연락처 이메일 👉 ${"noblefandom@naver.com"}\n
    인증번호 6자리 👉 ${authNumber}`, // 이메일 내용
    };

    smtpTransport.sendMail(mailOptions, (error, responses) => {
      if (error) {
        res.status(500).json({
          message: `Failed to send authentication email to ruhunsu3@naver.com`,
          authNumber,
        });
      } else {
        res.status(200).json({
          authNumber,
          message: `Authentication mail is sent to ruhunsu3@naver.com`,
        });
      }
      smtpTransport.close();
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ message: "실패" });
  }
};
export const postFindAndChange = async (req, res) => {
  try {
    const { changePassword, email } = req.body;
    const user = await User.findOne({ email });
    const creator = await Creator.findOne({ email });
    if (!user && !creator) {
      throw new Error("이메일에 대한 정보가 없습니다");
    }
    if (user) {
      user.password = changePassword;
      await user.save();
      return res
        .status(200)
        .json({ message: "비밀번호를 성공적으로 바꾸었습니다" });
    }
    if (creator) {
      creator.password = changePassword;
      await creator.save();
      return res
        .status(200)
        .json({ message: "비밀번호를 성공적으로 바꾸었습니다" });
    }
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};
