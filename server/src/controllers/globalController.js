import axios from "axios";
import { jwtConfig } from "../configs/jwtConfig.js";
import { cookiesConfig } from "../configs/cookiesConfig.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import NobleCoin from "../models/NobleCoin.js";
import ApplicationForm from "../models/ApplicationForm.js";
import { createUser } from "../utils/userUtils.js";
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
    return res
      .status(404)
      .json({ message: "사용자의 회원가입을 처리하는데 문제가 발생했습니다" });
  }
};
export const userLogin = async (req, res) => {
  console.log(req.body);
  const {email, password} = req.body;
  const userExist = await User.exists({email});
  const creatorExist = await Creator.exists({email});

  if (!userExist && !creatorExist) {
    return res.status(404).json({message : "유저가 존재하지 않습니다"})
  }
  if (userExist) {
    const user = await User.findOne({email});
    
  }
  if (creatorExist) {

  }
  return res.status(404).json({message : "로그인하는데 문제가 발생했습니다"})
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
        .cookie(
          "token",
          { token },
          {
            ...tokenConfig,
          }
        )
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
      .cookie(
        "token",
        { token },
        {
          ...tokenConfig,
        }
      )
      .status(200)
      .json({ message: "크리에이터 신청서가 잘 접수됐습니다." });
  } catch (error) {
    return res.status(404).json({
      message: error.message,
    });
  }
};
