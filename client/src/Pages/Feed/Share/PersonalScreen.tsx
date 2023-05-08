import { useEffect, useState } from "react";
import { Link, useMatch } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import MembershipTap from "../../../Components/MembershipTap";
import { subscribe } from "diagnostics_channel";
import { useRecoilState } from "recoil";
import { userFeedLayout } from "../../../atoms/atoms";
import CreateFeed from "../Creator/CreateFeed";
import RequestionOverlay from "../Creator/RequestionOverlay";
import ResponseToReq from "../Creator/ResponseToReq";
const Wrapper = styled.div`
  width: 80%;
  padding-left: 2vw;
  padding-right: 10vw;
  padding-bottom: 1.5vw;
  padding-top: 1.5vw;
  border-left: 1px solid white;
  margin-left: 2vw;
  min-height: 150vw;
  height: auto;
  display: flex;
  flex-direction: column;
`;
const UserProfileImageBox = styled.div`
  width: 100%;
  height: auto;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  #profile_background_img {
    height: 22vw;
    width: 100%;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    display: flex;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-top-right-radius: 20px;
      border-top-left-radius: 20px;
    }
  }
  #profile_main_img {
    width: 120px;
    height: 120px;
    position: absolute;
    bottom: -4vw;
    border-radius: 100%;
    outline: 3px solid white;
    overflow: hidden;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }
`;
const UserInfomationBox = styled.div<MetaProps>`
  width: 100%;
  min-height: 20vw;
  height: auto;
  padding: 0 2vw;
  padding-bottom: 2vw;

  #user_meta_infomation {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1vw;
    #user_main_info {
      display: flex;
      flex-direction: column;
      span:nth-child(1) {
        color: white;
        text-shadow: ${(props) => props.theme.textShadow};
        font-weight: 600;
        font-size: 1.5vw;
      }
      span:nth-child(2) {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1vw;
      }
      span:nth-child(3) {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1vw;
        span {
          color: ${(props) => props.theme.accentColor};
          font-size: 1vw;
          text-shadow: none;
        }
        span:hover {
          cursor: pointer;
          text-shadow: ${(props) => props.theme.textShadow};
        }
      }
    }
    #user_sub_info {
      display: flex;
      flex-direction: column;
      align-items: center;
      span {
        color: rgba(255, 255, 255, 0.8);
        font-size: 1vw;
      }
    }
  }
  #user_follow_btn_container {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      border: 1px solid
        ${(props) => (props.follow ? props.theme.accentColor : "white")};
      background-color: black;
      color: ${(props) => (props.follow ? props.theme.accentColor : "white")};
      box-shadow: ${(props) => props.theme.textShadow};
      text-shadow: ${(props) => props.theme.textShadow};
      font-size: 1.1vw;
      border-radius: 20px;
      padding: 0.5vw 2vw;
      transition: all 0.1s ease-in-out;
      display: flex;
      align-items: center;
      justify-content: center;
      svg {
        font-size: 1.1vw;
      }
    }
    button:hover {
      cursor: pointer;
      color: ${(props) => props.theme.accentColor};
      border-color: ${(props) => props.theme.accentColor};
    }
  }
  #user_introduce_box {
    margin-top: 1vw;
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.boxShadow};
    padding: 0.5vw 0;
    background-color: rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: auto;
    p {
      padding: 1vw;
      white-space: pre-wrap;
      font-size: 1.2vw;
      color: white;
      height: auto;
      span {
        display: block;
      }
    }
    div {
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      span {
        font-size: 1vw;
        color: rgba(255, 255, 255, 0.6);
      }
      hr {
        width: 45%;
        border-bottom: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
    div:hover {
      cursor: pointer;
    }
  }
`;
const UserNavigationBox = styled.div<NavigateProps>`
  width: 100%;
  height: 5vw;
  ul {
    display: flex;
    width: 100%;
    height: 100%;
    a:nth-child(1) {
      border-bottom: ${(props) =>
        props.isFeedPage ? "1px solid white" : "none"};
      background-color: ${(props) =>
        props.isFeedPage ? "rgba(255, 255, 255, 0.1)" : "none"};
      color: ${(props) =>
        props.isFeedPage ? props.theme.accentColor : "white"};
    }
    a:nth-child(2) {
      border-bottom: ${(props) =>
        props.isRequestionPage ? "1px solid white" : "none"};
      background-color: ${(props) =>
        props.isRequestionPage ? "rgba(255, 255, 255, 0.1)" : "none"};
      color: ${(props) =>
        props.isFeedPage ? props.theme.accentColor : "white"};
    }
    a {
      width: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 1.5vw;
      transition: 0.1s ease-in-out;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    a:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const SubscribeBox = styled.div`
  width: 100%;
  height: auto;
  padding: 0 2vw;
  margin-bottom: 2vw;
  button {
    width: 100%;
    padding: 1vw 2vw;
    background-color: black;
    border: 1px solid white;
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.textShadow};
    display: flex;
    justify-content: space-between;
    transition: 0.1s ease-in-out;
    span {
      font-size: 1.3vw;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    span:nth-child(2) {
      color: ${(props) => props.theme.accentColor};
    }
  }
  button:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
    span:nth-child(1) {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OverlayBox = styled(motion.div)`
  min-width: 40vw;
  width: auto;
  max-height: 55vw;
  min-height: 55vw;
  overflow-y: scroll;
  border-radius: 10px;
  background-color: black;
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.textShadow};
  padding: 1vw;
`;
interface NavigateProps {
  isFeedPage: boolean;
  isRequestionPage: boolean;
}
interface MetaProps {
  follow: boolean;
}
const overlayVariant = {
  start: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  end: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  exit: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
};
const overlayBoxVariant = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
function PersonalScreen() {
  const originalString = `국회는 의장 1인과 부의장 2인을 선출한다. 한 회계연도를 넘어 계속하여 지출할 필요가 있을 때에는 정부는 연한을 정하여 계속비로서 국회의 의결을 얻어야 한다.

이 헌법시행 당시의 법령과 조약은 이 헌법에 위배되지 아니하는 한 그 효력을 지속한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.

국가는 건전한 소비행위를 계도하고 생산품의 품질향상을 촉구하기 위한 소비자보호운동을 법률이 정하는 바에 의하여 보장한다. 형사피고인은 유죄의 판결이 확정될 때까지는 무죄로 추정된다.

형사피의자 또는 형사피고인으로서 구금되었던 자가 법률이 정하는 불기소처분을 받거나 무죄판결을 받은 때에는 법률이 정하는 바에 의하여 국가에 정당한 보상을 청구할 수 있다.

대법원과 각급법원의 조직은 법률로 정한다. 국무회의는 정부의 권한에 속하는 중요한 정책을 심의한다. 법률이 정하는 주요방위산업체에 종사하는 근로자의 단체행동권은 법률이 정하는 바에 의하여 이를 제한하거나 인정하지 아니할 수 있다.

일반사면을 명하려면 국회의 동의를 얻어야 한다. 각급 선거관리위원회는 선거인명부의 작성등 선거사무와 국민투표사무에 관하여 관계 행정기관에 필요한 지시를 할 수 있다.

모든 국민은 직업선택의 자유를 가진다. 공무원의 신분과 정치적 중립성은 법률이 정하는 바에 의하여 보장된다. 재의의 요구가 있을 때에는 국회는 재의에 붙이고, 재적의원과반수의 출석과 출석의원 3분의 2 이상의 찬성으로 전과 같은 의결을 하면 그 법률안은 법률로서 확정된다.
            `;
  const isFeedPage = useMatch("/main/:userId/feed");
  const isRequestPage = useMatch("/main/:userId/requestion");
  const [isOverflow, setIsOverflow] = useState(false);
  const [seeMore, setSeeMore] = useState(false);
  const [introText, setIntroText] = useState("");
  // User Follow Check
  const [follow, setFollow] = useState(false);
  // Overlay Management
  const [overlay, setOverlay] = useRecoilState(userFeedLayout);

  const [overlayComponent, setOverlayComponent] = useState<null | JSX.Element>(
    null
  );
  // Overlay Management to Recoil
  useEffect(() => {
    if (overlay === null) {
      return;
    }
    if (overlay === "subscribe") {
      setOverlayComponent(<MembershipTap />);
    }
    if (overlay === "feed") {
      setOverlayComponent(<CreateFeed />);
    }
    if (overlay === "request") {
      setOverlayComponent(<RequestionOverlay />);
    }
    if (overlay === "response") {
      setOverlayComponent(<ResponseToReq />);
    }
  }, [overlay]);
  useEffect(() => {
    if (originalString.length > 150) {
      setIsOverflow(true);
      setIntroText(originalString.slice(0, 150) + "...");
    } else {
      setIntroText(originalString);
    }
  }, []);
  const handleSeeMore = () => {
    setSeeMore((pre) => !pre);
    if (seeMore) {
      setIntroText(originalString);
    } else {
      setIntroText(originalString.slice(0, 150) + "...");
    }
  };
  return (
    <Wrapper>
      <UserProfileImageBox>
        <div id="profile_background_img">
          <img
            src="https://i.ytimg.com/vi/LDNy2oJ22lM/maxresdefault.jpg"
            alt=""
          />
        </div>
        <div id="profile_main_img">
          <img
            src="https://biz.chosun.com/resizer/rz9ujfjHav8ySL_35PBUk8M5Z6c=/530x679/smart/cloudfront-ap-northeast-1.images.arcpublishing.com/chosunbiz/52DIJZRC3W77PEGSHABYQCZFCE.jpg"
            alt=""
          />
        </div>
      </UserProfileImageBox>
      <UserInfomationBox follow={follow}>
        <div id="user_meta_infomation">
          <div id="user_main_info">
            <span>user_name</span>
            <span>@user_id</span>
            <span>
              URL: <span>noblefandom.co.kr/main/userid</span>
            </span>
          </div>
          <div id="user_sub_info">
            <span>팔로우 2302</span>
            <span>포스트 23</span>
          </div>
        </div>
        <div id="user_follow_btn_container">
          <button onClick={() => setFollow((pre) => !pre)}>
            팔로우
            {follow ? <BsCheck /> : null}
          </button>
        </div>
        <div id="user_introduce_box">
          <p>{introText}</p>
          {isOverflow ? (
            <div onClick={handleSeeMore}>
              <hr />
              <span>{seeMore ? "더보기" : "숨기기"}</span>
              <hr />
            </div>
          ) : null}
        </div>
      </UserInfomationBox>
      <SubscribeBox>
        <button onClick={() => setOverlay("subscribe")}>
          <span>구독하기</span>
          <span>₩70,000 / 월</span>
        </button>
      </SubscribeBox>
      {/* Creator Part */}
      <UserNavigationBox
        isFeedPage={
          isFeedPage !== null || (isFeedPage === null && isRequestPage === null)
        }
        isRequestionPage={isRequestPage !== null}
      >
        <ul>
          <Link to="feed">
            <li>피드</li>
          </Link>
          <Link to="requestion">
            <li>유저 리퀘스트</li>
          </Link>
        </ul>
      </UserNavigationBox>
      <Outlet />
      {overlay ? (
        <AnimatePresence>
          <Overlay
            onClick={() => setOverlay(null)}
            variants={overlayVariant}
            initial="start"
            animate="end"
            exit="exit"
          >
            <OverlayBox
              onClick={(event) => event.stopPropagation()}
              variants={overlayBoxVariant}
              initial="start"
              animate="end"
              exit="exit"
            >
              {overlayComponent}
            </OverlayBox>
          </Overlay>
        </AnimatePresence>
      ) : null}
    </Wrapper>
  );
}

export default PersonalScreen;
