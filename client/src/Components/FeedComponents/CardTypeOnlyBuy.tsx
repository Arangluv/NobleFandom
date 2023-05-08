import styled from "styled-components";
import { BiLock } from "react-icons/bi";
import { AiOutlinePicture } from "react-icons/ai";
import { RiVideoFill } from "react-icons/ri";
import { GiCrownCoin } from "react-icons/gi";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30vw;
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.textShadowThin};
  transition: all 0.1s ease-in-out;
  position: relative;
  & > svg {
    font-size: 6vw;
    color: rgba(255, 255, 255, 0.4);
  }
  span {
    margin-top: 1vw;
    font-size: 1.3vw;
    color: rgba(255, 255, 255, 0.4);
  }
  #only_buy_media_infomation {
    position: absolute;
    width: 100%;
    bottom: 1vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    span {
      display: flex;
      align-items: center;
      margin-right: 0.5vw;
      color: rgba(255, 255, 255, 0.8);
      svg {
        margin-right: 0.2vw;
      }
    }
    #post_price_value {
      color: ${(props) => props.theme.accentColor};
    }
  }
  &:hover {
    border-color: ${(props) => props.theme.accentColor};
  }
`;

function CardTypeOnlyBuy() {
  return (
    <Wrapper>
      <BiLock />
      <span>구매 후 열람하실 수 있습니다</span>
      <div id="only_buy_media_infomation">
        <span>
          <AiOutlinePicture />3
        </span>
        <span>
          <RiVideoFill />3
        </span>
        <span id="post_price_value">
          <GiCrownCoin />
          777
        </span>
      </div>
    </Wrapper>
  );
}

export default CardTypeOnlyBuy;
