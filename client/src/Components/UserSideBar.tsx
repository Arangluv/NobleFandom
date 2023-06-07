import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
// SideBar
import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMessage,
  AiFillHeart,
  AiFillExclamationCircle,
} from "react-icons/ai";
import { WiMoonAltNew } from "react-icons/wi";
import { RiVipDiamondLine } from "react-icons/ri";
import { BsFillGearFill, BsSearch } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiCrownCoin } from "react-icons/gi";
import { useRecoilValue } from "recoil";
import { loginState } from "../atoms/atoms";
import {
  getAlarmsState,
  getCoinValue,
  postAlarmsClick,
  postMessageClick,
} from "../api/user/usesApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Side Bar
const SideBarContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5vw;
  padding-left: 3vw;
  padding-right: 3vw;
  position: relative;
  margin-bottom: 3vw;
  h1 {
    position: fixed;
    width: 17vw;
    height: 5vw;
    top: 1vw;
    a {
      color: white;
      font-size: 2vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
`;
const SubBarContainer = styled.div`
  /* border: 1px solid red; */
  height: auto;
  width: calc(20% - 3vw);
  position: fixed;
  #user_container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    #profile_box {
      width: 40%;
      display: flex;
      padding: 0 1.2vw;
      align-items: center;
      #profile_box_border {
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadow};
        width: 3vw;
        height: 3vw;
        border-radius: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
          border-radius: 100%;
        }
      }
    }
    span {
      width: 100%;
      height: 100%;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      text-shadow: ${(props) => props.theme.textShadow};
      font-size: 1.5vw;
      font-weight: 700;
      svg {
        width: 1.5vw;
        height: 1.5vw;
      }
    }
    #user_meta_info {
      width: 60%;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: column;
      /* justify-content: center; */
      #user_name {
        display: block;
        font-size: 1.2vw;
      }
      #user_id {
        display: block;
        font-size: 1vw;
        font-weight: 500;
        text-shadow: none;
        color: rgba(255, 255, 255, 0.8);
      }
    }
  }
  ul {
    margin-top: 1vw;
    display: flex;
    flex-direction: column;
    #alarm_container,
    #message_container {
      position: relative;
      #exclamation_mark {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 2vw;
        top: 0.5vw;
        color: ${(props) => props.theme.textRedColor};
      }
    }
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.8vw;
      padding: 1vw 1.2vw;
      border-radius: 2vw;
      transition: 0.1s ease-in-out;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      span {
        margin-left: 0.7vw;
        a {
          color: white;
          text-shadow: ${(props) => props.theme.textShadow};
        }
      }
      svg {
        width: 1.8vw;
        height: 1.8vw;
      }
    }
    li:hover {
      outline: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
    }
    #only_creator_list {
      color: ${(props) => props.theme.accentColor};
      text-shadow: ${(props) => props.theme.textRedShadow};
    }
  }
  #charge_container {
    height: 4vw;
    margin-top: 1vw;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    border-radius: 10px;
    div {
      width: 100%;
      height: 100%;
      display: flex;
      border-radius: 10px;
      align-items: center;
      #crown_coin_icon {
        color: white;
        width: 20%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        svg {
          width: 22px;
          height: 22px;
          color: #ffd700;
        }
      }
      #crown_coin_value {
        width: 45%;
        height: 100%;
        display: flex;
        align-items: center;
        padding-left: 1vw;
        color: white;
        text-shadow: ${(props) => props.theme.textShadow};
      }
      button {
        width: 35%;
        height: 100%;
        border: none;
        border-left: 1px solid white;
        background-color: ${(props) => props.theme.accentColor};
        color: white;
        font-weight: 600;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
      }
      button:hover {
        cursor: pointer;
      }
    }
  }
`;
interface CProps {
  coinQuantity: string;
}
interface AProps {
  alarms: {
    isNewAlarm: boolean;
    isNewMessage: boolean;
  };
}
function UserSideBar() {
  const userLoginStste = useRecoilValue(loginState);
  const navigator = useNavigate();
  const { isLoading: alarmsLoading, data: alarms } = useQuery<
    AProps | undefined
  >({
    queryKey: ["newAlarms"],
    queryFn: getAlarmsState,
    staleTime: 1000 * 60 * 5,
    cacheTime: Infinity,
    meta: {
      message: "알람상태를 업데이트 하는데 실패했습니다",
    },
  });

  const { isLoading, data: coin } = useQuery<CProps | undefined>({
    queryKey: ["nobleCoinValue"],
    queryFn: getCoinValue,
    staleTime: 1000 * 60 * 5,
    cacheTime: Infinity,
    meta: {
      message: "코인을 받아오는데 실패했습니다",
    },
  });
  const queryClient = useQueryClient();
  const { mutate: alarmsMutate } = useMutation({
    mutationFn: postAlarmsClick,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["newAlarms"],
      });
    },
    onError: () => {
      toast.error("알람상태를 변경하는데 실패했습니다.");
      console.log("실패");
    },
  });
  const { mutate: messageMutate } = useMutation({
    mutationFn: postMessageClick,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ["newAlarms"],
      });
    },
    onError: () => {
      toast.error("메세지의 상태를 변경하는데 실패했습니다");
      console.log("실패");
    },
  });
  const handleAlarmClick = () => {
    if (!userLoginStste.email) {
      return;
    }
    if (!alarms?.alarms.isNewAlarm) {
      return;
    }
    const email = userLoginStste.email;
    alarmsMutate({ email });
  };
  const handleMessageClick = () => {
    if (!userLoginStste.email) {
      return;
    }
    if (!alarms?.alarms.isNewMessage) {
      return;
    }
    const email = userLoginStste.email;
    messageMutate({ email });
  };
  return (
    <SideBarContainer>
      <h1>
        <Link to="/">NOBLE FANDOM</Link>
      </h1>
      <SubBarContainer>
        {/* 만약 프로필사진이 있으면 다른 경우로 만들어줘야함 ex. border none .. */}
        <div
          id="user_container"
          onClick={() => navigator(`${userLoginStste.userId}`)}
        >
          <div id="profile_box">
            <div id="profile_box_border">
              {userLoginStste.profileImg ? (
                <img src={userLoginStste.profileImg} alt="user profile image" />
              ) : (
                <span>
                  <FaUser />
                </span>
              )}
            </div>
          </div>
          <div id="user_meta_info">
            <span id="user_name">{userLoginStste.username}</span>
            <span id="user_id">@{userLoginStste.userId}</span>
          </div>
        </div>
        <ul>
          <Link to="/main">
            <li>
              <AiOutlineHome />
              <span>홈</span>
            </li>
          </Link>
          <Link to="alarm">
            <li id="alarm_container" onClick={handleAlarmClick}>
              <AiOutlineBell />
              {alarms?.alarms.isNewAlarm ? (
                <WiMoonAltNew id="exclamation_mark" />
              ) : null}
              <span>알림</span>
            </li>
          </Link>
          <Link to="membership">
            <li>
              <RiVipDiamondLine />
              <span>멤버쉽</span>
            </li>
          </Link>
          <Link to="chat">
            <li id="message_container" onClick={handleMessageClick}>
              <AiOutlineMessage />
              {alarms?.alarms?.isNewMessage ? (
                <WiMoonAltNew id="exclamation_mark" />
              ) : null}
              <span>메시지</span>
            </li>
          </Link>
          <Link to="search">
            <li>
              <BsSearch />
              <span>찾기</span>
            </li>
          </Link>
          <Link to="liked">
            <li>
              <AiFillHeart />
              <span>좋아요 게시물</span>
            </li>
          </Link>
          <Link to="setting">
            <li>
              <BsFillGearFill />
              <span>설정</span>
            </li>
          </Link>
        </ul>
        <div id="charge_container">
          <div>
            <span id="crown_coin_icon">
              <GiCrownCoin />
            </span>
            <span id="crown_coin_value">
              {isLoading ? "0" : coin?.coinQuantity}
            </span>
            <button>충전하기</button>
          </div>
        </div>
      </SubBarContainer>
    </SideBarContainer>
  );
}

export default UserSideBar;
