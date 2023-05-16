import jwt from "jsonwebtoken";
import { jwtConfig } from "../configs/jwtConfig.js";
import User from "../models/User.js";

export const inspectAdmin = async (req, res, next) => {
  try {
    const { token } = req.cookies.token;
    const { secretKey } = jwtConfig;
    const userInformation = jwt.verify(token, secretKey);
    const { id } = userInformation;
    const user = await User.findById(id);

    if (
      user.username === "노블팬덤 공식계정" &&
      user.email === "noblefandom@gmail.com"
    ) {
      console.log("next?");
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "api 호출을 위해 관리자를 인증하는 도중 실패했습니다.",
    });
  }
};
