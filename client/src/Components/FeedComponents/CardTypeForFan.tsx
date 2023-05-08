import styled from "styled-components";
import { BiLock } from "react-icons/bi";
import { AiOutlinePicture } from "react-icons/ai";
import { RiVideoFill } from "react-icons/ri";
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
  #media_infomation {
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
  }
  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
  }
`;

function CardTypeForFan() {
  return (
    <Wrapper>
      <BiLock />
      <span>팬이 된 후 게시글 확인하기</span>
      <div id="media_infomation">
        <span>
          <AiOutlinePicture />3
        </span>
        <span>
          <RiVideoFill />3
        </span>
      </div>
    </Wrapper>
  );
}

export default CardTypeForFan;
