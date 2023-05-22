import User from "../../models/User.js";
import ApplicationForm from "../../models/ApplicationForm.js";
import Creator from "../../models/Creator.js";
import NobleCoin from "../../models/NobleCoin.js";
import Request from "../../models/Request.js";
import Alarm from "../../models/Alarm.js";

const adminMakeAlarm = async (owner, content) => {
  try {
    const alarm = await Alarm.findOne({ owner });
    if (alarm) {
      const data = {
        sender: {
          userId: "noblefandom_official",
          userProfileImg:
            "https://cdn.icon-icons.com/icons2/37/PNG/512/administrator_3552.png",
        },
        content,
        createdAt: Date.now(),
      };
      alarm.alarms.push(data);
      await alarm.save();
      return;
    }
    const newAlarm = await Alarm.create({
      owner,
      alarms: [],
    });
    const data = {
      sender: {
        userId: "noblefandom_official",
        userProfileImg:
          "https://cdn.icon-icons.com/icons2/37/PNG/512/administrator_3552.png",
      },
      content,
      createdAt: Date.now(),
    };
    newAlarm.alarms.push(data);
    await newAlarm.save();
  } catch (error) {
    console.log(error);
    throw new Error("어드민 알람을 생성하는데 문제가 발생했습니다.");
  }
};

export const getRegister = async (req, res) => {
  try {
    const register = await ApplicationForm.find({});
    return res.status(200).json({ register });
  } catch (error) {
    return res
      .status(404)
      .json({ message: "크리에이터 신청서를 찾는데 문제가 발생했습니다" });
  }
};

export const postApprove = async (req, res) => {
  const { owner } = req.body;
  console.log(owner);
  try {
    const user = await User.findById(owner).populate(["nobleCoin"]);
    console.log(user);
    // user가 없는경우
    if (!user) {
      return res
        .status(404)
        .json({ message: "Register를 등록한 유저를 찾지 못했습니다" });
    }
    const creator = await Creator.create({
      email: user.email,
      username: user.username,
      userType: "creator",
      password: user.password,
      socialOnly: user.socialOnly,
      userId: user.userId,
      profileImg: user.profileImg,
      backGroundImg: user.backGroundImg,
      adultCertification: user.adultCertification,
      profileDescription: user.profileDescription,
      approved: true,
      isNewAlarm: true, // creator 생성시 승인되었다는 알람발송
      isNewMessage: true, // 생성시 Noblefandom 에서 메세지 발송
      paidCardInfo: user.paidCardInfo,
      follower: user.follower,
      likedFeed: user.likedFeed,
      // TODO 알람의 owner 수정
    });

    // User -> Creator 전환 시 유저가 가지고 있던 코인 -> 크리에이터 코인으로 바꿔준다
    const creatorNobleCoin = await NobleCoin.create({
      coinOwner: creator._id,
      coinQuantity: user.nobleCoin.coinQuantity,
      coinGetLog: user.nobleCoin.coinGetLog,
    });
    creator.nobleCoin = creatorNobleCoin;

    // Alarms 내용 User -> Creator
    const newAlarm = user.alarms;
    newAlarm.owner = creator._id;
    creator.alarms = newAlarm;
    await adminMakeAlarm(
      creator._id,
      "축하합니다 크리에이터에 승인되었습니다!"
    );
    // Update Chat
    const newChat = user.chat;
    newChat.owner = creator._id;
    creator.chat = newChat;

    // Update Request
    // request가 없다면 저장 후 return
    if (user.request.length === 0) {
      await creator.save();
      // creator가 save 됐다면 기존 유저는 삭제해야한다.
      await user.deleteOne();
      // 유저와 관련된 Coin과 Alarm 역시 삭제되어야한다.
      await NobleCoin.findOneAndDelete({ coinOwner: owner });
      await Alarm.findOneAndDelete({ owner });
      // register의 진행상황을 false -> true
      const register = await ApplicationForm.findOne({ owner });
      register.processed = true;
      await register.save();
      return res
        .status(200)
        .json({ message: "크리에이터 승인에 성공했습니다" });
    }

    // 있다면 순회 후 update하여 변경
    user.request.forEach(async (request) => {
      const userRequest = await Request.findOne(request);
      userRequest.sender = creator._id;
      await userRequest.save();
    });

    // register의 진행상황을 false -> true
    const register = await ApplicationForm.findOne({ owner });
    register.processed = true;
    await register.save();
    // creator를 저장
    await creator.save();
    // creator가 save 됐다면 기존 유저는 삭제해야한다.
    await user.deleteOne();
    // 유저와 관련된 Coin과 Alarm 역시 삭제되어야한다.
    await NobleCoin.findOneAndDelete({ coinOwner: owner });
    await Alarm.findOneAndDelete({ owner });
    return res.status(200).json({ message: "크리에이터 승인에 성공했습니다" });
  } catch (error) {
    console.log("post Approve에서 문제가 발생");
    console.log(error);
    return res.status(404).json({ message: error.message });
  }
};

export const postReject = async (req, res) => {
  const { reject, owner } = req.body; // reject에는 반려사유, owner에는 신청자
  try {
    const user = await User.findById(owner);
    const register = await ApplicationForm.findOne({ owner });
    user.isNewAlarm = true;
    register.processed = true;
    await user.save();
    await adminMakeAlarm(owner, reject);
    await register.save();
    return res.status(200).json({ message: "반려요청을 잘 처리했습니다" });
  } catch (error) {
    console.log(
      "Creator Regiser에서 반려사유를 처리하는데 문제가 발생했습니다."
    );
    console.log(error);
    return res
      .status(404)
      .json({ message: "Register를 반려하는데 문제가 발생했습니다" });
  }
};

export const postRegiserDelete = async (req, res) => {
  console.log(req.body);
  const { owner } = req.body;
  try {
    await ApplicationForm.findOneAndDelete({ owner });
    return res.status(200).json({ message: "성공적으로 삭제되었습니다" });
  } catch (error) {
    console.log(error);
    return res
      .status(404)
      .json({ message: "Creator Register를 삭제하는데 문제가 발생했습니다" });
  }
};
