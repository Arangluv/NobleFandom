import express from "express";
import {
  getCoinValue,
  postEditProfile,
  postChagePassword,
  getAlarmsState,
  postAlarmClick,
  getAlarms,
  deleteAlarm,
  getPersonalScreenUserData,
  postMessageClick,
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
userRouter.route("/alarms-state").get(getAlarmsState);
userRouter.route("/alram-click").post(postAlarmClick);
userRouter.route("/message-click").post(postMessageClick);
userRouter.route("/get-alarms").get(getAlarms);
userRouter.route("/delete-alarm").post(deleteAlarm);
userRouter.route("/get-personalscreen-userdata").get(getPersonalScreenUserData);
export default userRouter;
