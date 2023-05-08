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

// Side Bar
const SideBarContainer = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-top: 5vw;
  padding-left: 3vw;
  padding-right: 3vw;
`;
const SubBarContainer = styled.div`
  /* border: 1px solid red; */
  height: auto;
  width: calc(20% - 3vw);
  position: fixed;
  div {
    width: 3vw;
    height: 3vw;
    border-radius: 100%;
    border: 1px solid rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.5vw;
      font-weight: 700;
    }
  }
  ul {
    margin-top: 2vw;
    display: flex;
    flex-direction: column;
    li {
      display: flex;
      align-items: center;
      margin-bottom: 0.8vw;
      color: rgba(255, 255, 255, 0.5);
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
      cursor: pointer;
    }
  }
`;
function SideBar() {
  return (
    <SideBarContainer>
      <SubBarContainer>
        <div>
          <span>N</span>
        </div>
        <ul>
          <li>
            <AiOutlineHome />
            <span>홈</span>
          </li>
        </ul>
      </SubBarContainer>
    </SideBarContainer>
  );
}

export default SideBar;
