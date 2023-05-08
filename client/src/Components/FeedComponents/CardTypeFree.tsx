import styled from "styled-components";
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
  #card_img_container {
    width: 100%;
    height: 100%;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 10px;
    }
  }
  #free_media_infomation {
    position: absolute;
    width: auto;
    bottom: 1vw;
    padding: 0 1vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
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
    border-color: ${(props) => props.theme.accentColor};
  }
`;
function CardTypeFree() {
  return (
    <Wrapper>
      <div id="card_img_container">
        <img
          src="https://dimg.donga.com/wps/SPORTS/IMAGE/2022/06/10/113877570.2.jpg"
          alt="유저 카드피드 대표사진"
        />
      </div>
      <div id="free_media_infomation">
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

export default CardTypeFree;
