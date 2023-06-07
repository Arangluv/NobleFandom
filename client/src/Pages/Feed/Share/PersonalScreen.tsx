import { useEffect, useState } from "react";
import { Link, useLocation, useMatch, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { BsCheck } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import MembershipTap from "../../../Components/MembershipTap";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState, userFeedLayout } from "../../../atoms/atoms";
import CreateFeed from "../Creator/CreateFeed";
import RequestionOverlay from "../Creator/RequestionOverlay";
import ResponseToReq from "../Creator/ResponseToReq";
import { FaHandPointRight, FaUser } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import { getPersonalScreenUserData } from "../../../api/user/creatorApi";
import LoadingOverlay from "../../../Components/LoadingOverlay";
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
    display: flex;
    align-items: center;
    justify-content: center;
    span {
      font-size: 1.3vw;
      color: rgba(255, 255, 255, 0.5);
      &:hover {
        cursor: pointer;
      }
    }
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
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      color: rgba(255, 255, 255, 0.5);
      width: 3.5vw;
      height: 3.5vw;
      &:hover {
        cursor: pointer;
      }
    }
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
      width: 100%;
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
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    small {
      padding: 1vw 0;
      border-radius: 10px;
      border: 1px solid ${(props) => props.theme.accentColor};
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: ${(props) => props.theme.accentColor};
      font-size: 1.4vw;
      font-weight: 600;
      transition: all 0.1s ease-in-out;
      svg {
        margin-left: 0.5vw;
        width: 2vw;
        height: 2vw;
      }
      &:hover {
        cursor: pointer;
        background-color: white;
      }
    }
  }
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
interface PersonalScreenDataProps {
  userId: string;
  backGroundImg: string | null;
  profileImg: string | null;
  profileDescription: string;
  username: string;
  follower: [];
  membershipPlan: [];
}
function PersonalScreen() {
  const userLoginState = useRecoilValue(loginState);
  const navigator = useNavigate();
  const location = useLocation();
  // 현재 방문중인 페이지가 내 페이지에 해당되는지 아닌지에 대한 검사
  const [isMyPage, setIsMyPage] = useState(false);
  // 유저의 path에서 userid를 저장
  const [currentPageUserId, setCurrentPageUserId] = useState("");
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

  const { data: personalScreenData, isLoading: personalDataLoading } =
    useQuery<PersonalScreenDataProps>({
      queryKey: ["userScreen", currentPageUserId],
      queryFn: () => getPersonalScreenUserData(currentPageUserId),
      staleTime: 5 * 60 * 1000,
      cacheTime: Infinity,
    });

  // MyPage Inspect, set Current Path User Id
  useEffect(() => {
    if (!userLoginState.userId) {
      return;
    }
    // location Pathname example
    // /main/:useriD
    const currentPathId = location.pathname.split("/")[2];
    if (userLoginState.userId === currentPathId) {
      setIsMyPage(true);
    }
    setCurrentPageUserId(currentPathId);
  }, [location]);
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
    if (personalDataLoading) {
      return;
    }
    if (!personalScreenData?.profileDescription) {
      return;
    }
    if (personalScreenData.profileDescription.length > 150) {
      setIsOverflow(true);
      setIntroText(personalScreenData.profileDescription.slice(0, 150) + "...");
    } else {
      setIntroText(personalScreenData.profileDescription);
    }
  }, [personalScreenData, personalDataLoading]);
  const handleSeeMore = () => {
    if (!userLoginState.profileDescription) {
      return;
    }
    setSeeMore((pre) => !pre);
    if (seeMore) {
      setIntroText(userLoginState.profileDescription);
    } else {
      setIntroText(userLoginState.profileDescription.slice(0, 150) + "...");
    }
  };
  return (
    <>
      {personalDataLoading ? null : (
        <Wrapper>
          <UserProfileImageBox>
            <div id="profile_background_img">
              {personalScreenData?.backGroundImg ? (
                <img
                  src={personalScreenData.backGroundImg}
                  alt="user personal screen background image"
                />
              ) : isMyPage ? (
                <span onClick={() => navigator("/main/setting/profile")}>
                  배경 이미지 설정
                </span>
              ) : null}
            </div>
            <div id="profile_main_img">
              {personalScreenData?.profileImg ? (
                <img
                  src={personalScreenData.profileImg}
                  alt="user personal screen profile image"
                />
              ) : isMyPage ? (
                <FaUser onClick={() => navigator("/main/setting/profile")} />
              ) : null}
            </div>
          </UserProfileImageBox>
          <UserInfomationBox follow={follow}>
            <div id="user_meta_infomation">
              <div id="user_main_info">
                <span>{personalScreenData?.username}</span>
                <span>{`@${userLoginState?.userId}`}</span>
                <span>
                  URL:{" "}
                  <span>{`noblefandom.co.kr/main/${userLoginState.userId}`}</span>
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
          {userLoginState.userType === "creator" ? (
            personalScreenData?.membershipPlan.length === 0 ? (
              <SubscribeBox>
                <div>
                  <small
                    onClick={() =>
                      navigator("/main/creator-setting/membership")
                    }
                  >
                    맴버쉽 플랜 설정하기 <FaHandPointRight />
                  </small>
                </div>
              </SubscribeBox>
            ) : (
              <SubscribeBox>
                <button onClick={() => setOverlay("subscribe")}>
                  <span>구독하기</span>
                  <span>₩70,000 / 월</span>
                </button>
              </SubscribeBox>
            )
          ) : null}
          {/* Creator Part */}
          <UserNavigationBox
            isFeedPage={
              isFeedPage !== null ||
              (isFeedPage === null && isRequestPage === null)
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
      )}
      {personalDataLoading ? (
        <LoadingOverlay isLoading={personalDataLoading} />
      ) : null}
    </>
  );
}

export default PersonalScreen;
