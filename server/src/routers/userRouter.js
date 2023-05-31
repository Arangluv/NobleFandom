import express from "express";
import {
  getCoinValue,
  postEditProfile,
  postChagePassword,
} from "../controllers/userController.js";
import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import { awsImageUploadConfig } from "../configs/awsConfig.js";
aws.config.update({ ...awsImageUploadConfig });
const s3 = new aws.S3();
const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: "noblefandomimage", // 생성한 버킷 이름
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: (req, file, callback) => {
      const directoryName =
        file.fieldname === "user_profile" ? "user_profile" : "user_background"; // upload Derectory Setting
      callback(null, `${directoryName}/${Date.now()}_${file.originalname}`);
    },
  }),
  limit: {
    fileSize: 3000000,
  },
});
const userRouter = express.Router();

userRouter.route("/getCoin").get(getCoinValue);
userRouter
  .route("/edit-profile")
  .post(
    imageUploader.fields([
      { name: "user_profile" },
      { name: "user_background" },
    ]),
    postEditProfile
  );

userRouter.route("/change-password").post(postChagePassword);
export default userRouter;
