import dotenv from "dotenv";

dotenv.config();

export const awsImageUploadConfig = {
  accessKeyId: process.env.AWS_CREATOR_REGISTER_ACCESSKEY,
  secretAccessKey: process.env.AWS_CREATOR_REGISTER_SECRETKEY,
  region: "ap-northeast-2",
};
