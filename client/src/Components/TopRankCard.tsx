import styled from "styled-components";
import { MdOutlineVerified } from "react-icons/md";
import { FaCrown } from "react-icons/fa";

interface IRankProps {
  rank: string;
}

const TopRankCardBox = styled.div`
  margin-left: 1.5vw;
  margin-right: 1.5vw;
  border-radius: 10px;
  width: 27%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: ${(props) => props.theme.textShadow};
`;
const TopRankCardUserInfo = styled.div<IRankProps>`
  width: 100%;
  height: 20%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 1.5vw;
  position: relative;
  .rank_svg {
    color: ${(props) => {
      if (props.rank === "first") {
        return "#ffa502";
      } else if (props.rank === "second") {
        return "#dfe4ea";
      } else {
        return "rgb(98,70,55)";
      }
    }};
    position: absolute;
    top: 0vw;
    width: 20px;
    height: 20px;
  }
  div {
    width: 40px;
    height: 40px;
    border-radius: 100%;
    object-fit: contain;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  span {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    font-weight: 600;
    font-size: 1vw;
    margin-left: 1vw;
    display: flex;
    align-items: center;
    svg {
      color: #3498db;
      margin-left: 0.3vw;
    }
  }
`;
const TopRankCardImageContainer = styled.div`
  width: 100%;
  height: 80%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`;
function TopRankCard() {
  return (
    <TopRankCardBox>
      <TopRankCardUserInfo rank="second">
        <div>
          <img
            src="https://blog.kakaocdn.net/dn/bJIpg4/btrWqH4vJcZ/GHWnXId18DypiQ4frdIHIk/img.png"
            alt=""
          />
        </div>
        <span>
          xsks_ss
          <MdOutlineVerified />
        </span>
        <FaCrown className="rank_svg" />
      </TopRankCardUserInfo>
      <TopRankCardImageContainer>
        <img
          src="https://blog.kakaocdn.net/dn/bJIpg4/btrWqH4vJcZ/GHWnXId18DypiQ4frdIHIk/img.png"
          alt=""
        />
      </TopRankCardImageContainer>
    </TopRankCardBox>
  );
}

export default TopRankCard;
