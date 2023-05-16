import dotenv from "dotenv";
dotenv.config();

export const jwtConfig = {
  secretKey: process.env.JWT_SECRET_KEY, // 원하는 시크릿 키
  options: {
    algorithm: "HS256", // 해싱 알고리즘
    expiresIn: "7d", // 토큰 유효 기간
    // expiresIn: "10s", // 토큰 유효 기간
    issuer: "noblefandom", // 발행자
  },
};
