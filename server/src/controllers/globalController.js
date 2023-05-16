import axios from "axios";
import { jwtConfig } from "../configs/jwtConfig.js";
import { cookiesConfig } from "../configs/cookiesConfig.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import NobleCoin from "../models/NobleCoin.js";
import ApplicationForm from "../models/ApplicationForm.js";
import { createUser } from "../utils/userUtils.js";
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

export const creatorRegister = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const { email, username, userId, password, sns_account, sns_id } = data;
  const evidence_files = req.files;
  try {
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
      snsInfo: [{ snsAccount: sns_account, snsId: sns_id }],
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
