import User from "../models/User.js";
import NobleCoin from "../models/NobleCoin.js";
import { jwtConfig } from "../configs/jwtConfig.js";
import { cookiesConfig } from "../configs/cookiesConfig.js";
import jwt from "jsonwebtoken";
const tokenIssuance = (_id) => {
  const { secretKey, options } = jwtConfig;
  const payload = {
    id: _id.toString(),
  };
  const token = jwt.sign(payload, secretKey, options);
  const tokenConfig = cookiesConfig();
  return { token, tokenConfig };
};

export const createUser = async (email, username, password, userId) => {
  try {
    const emailExist = await User.exists({ email });
    if (emailExist) {
      throw new Error("이미 사용중인 이메일 입니다");
    }
    const usernameExist = await User.exists({ username });
    if (usernameExist) {
      throw new Error("이미 사용중인 닉네임 입니다");
    }
    let user = null;
    if (username === "노블팬덤 공식계정" && email === "noblefandom@gmail.com") {
      user = await User.create({
        username,
        email,
        password,
        userId,
        userType: "admin_arange",
      });
    } else {
      user = await User.create({
        username,
        email,
        password,
        userId,
      });
    }
    const { _id } = user;
    const nobleCoin = await NobleCoin.create({
      coinOwner: _id,
    });
    user.nobleCoin = nobleCoin;
    await user.save();
    const { token, tokenConfig } = tokenIssuance(_id);
    return { token, tokenConfig, _id };
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
};
