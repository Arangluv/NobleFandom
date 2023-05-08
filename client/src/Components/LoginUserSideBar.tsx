import styled from "styled-components";
// SideBar
import {
  AiOutlineHome,
  AiOutlineBell,
  AiOutlineMessage,
  AiFillHeart,
} from "react-icons/ai";
import { RiVipDiamondLine } from "react-icons/ri";
import { BsFillGearFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { GiCrownCoin } from "react-icons/gi";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";
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
    a {
      color: white;
      position: absolute;
      top: 1vw;
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
      justify-content: center;
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
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.8vw;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      padding: 1vw 1.2vw;
      border-radius: 2vw;
      transition: 0.1s ease-in-out;
      span {
        margin-left: 0.7vw;
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
function LoginUserSideBar() {
  return (
    <SideBarContainer>
      <h1>
        <Link to="/">NOBLE FANDOM</Link>
      </h1>
      <SubBarContainer>
        {/* 만약 프로필사진이 있으면 다른 경우로 만들어줘야함 ex. border none .. */}
        <div id="user_container">
          <div id="profile_box">
            <div id="profile_box_border">
              <span>
                <FaUser />
              </span>
            </div>
          </div>
          <div id="user_meta_info">
            <span id="user_name">귀여운 아랑씨</span>
            <span id="user_id">@Arang_luv</span>
          </div>
        </div>
        <ul>
          <li>
            <AiOutlineHome />
            <span>홈</span>
          </li>
          <li>
            <AiOutlineBell />
            <span>알림</span>
          </li>
          <li>
            <RiVipDiamondLine />
            <span>멤버쉽</span>
          </li>

          <li>
            <AiOutlineMessage />
            <span>메시지</span>
          </li>
          <li>
            <BsSearch />
            <span>찾기</span>
          </li>
          <li>
            <AiFillHeart />
            <span>좋아요 게시물</span>
          </li>
          <li>
            <BsFillGearFill />
            <span>설정</span>
          </li>
        </ul>
        <div id="charge_container">
          <div>
            <span id="crown_coin_icon">
              <GiCrownCoin />
            </span>
            <span id="crown_coin_value">2,300</span>
            <button>충전하기</button>
          </div>
        </div>
      </SubBarContainer>
    </SideBarContainer>
  );
}

export default LoginUserSideBar;
