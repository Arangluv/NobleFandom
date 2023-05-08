import styled from "styled-components";
import { MdOutlineVerified } from "react-icons/md";
const TopRankCardBox = styled.div`
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: ${(props) => props.theme.textShadow};
  transition: 0.1s ease-in-out;
  &:hover {
    box-shadow: #e84118 0px 0px 7px;
    border: 1px solid rgba(232, 65, 24, 0.8);
  }
`;
const TopRankCardUserInfo = styled.div`
  width: 100%;
  height: 20%;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 1.5vw;
  position: relative;
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
function SearchCard() {
  return (
    <TopRankCardBox>
      <TopRankCardUserInfo>
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

export default SearchCard;
