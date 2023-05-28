import express from "express";
import {
  googleLogin,
  userJoin,
  userLogin,
  creatorRegister,
  tokenInspect,
  userLogout,
} from "../controllers/globalController.js";
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
        file.fieldname === "evidence_file" ? "evidence" : "etc"; // upload Derectory Setting
      callback(null, `${directoryName}/${Date.now()}_${file.originalname}`);
    },
  }),
  limit: {
    fileSize: 3000000,
  },
});

const globalRouter = express.Router();
globalRouter.route("/google-login").post(googleLogin);
globalRouter.route("/join").post(userJoin);
globalRouter
  .route("/creator-register")
  .post(imageUploader.array("evidence_file"), creatorRegister);
globalRouter.route("/login").post(userLogin);
globalRouter.route("/token-inspect").get(tokenInspect);
globalRouter.route("/userLogout").post(userLogout);

export default globalRouter;
