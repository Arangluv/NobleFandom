import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: 6vw;
  display: flex;
  transition: 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
  }
  #img_container {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    div {
      width: 4vw;
      height: 4vw;
      border-radius: 100%;
      border: 1px solid white;
      object-fit: contain;
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
  }
  #content_box {
    width: 75%;
    height: 100%;
    display: flex;
    flex-direction: column;
    div:nth-child(1) {
      width: 100%;
      height: auto;
      span {
        color: white;
        font-size: 1.1vw;
        font-weight: 600;
        text-shadow: ${(props) => props.theme.textShadow};
      }
    }
    div:nth-child(2) {
      width: 100%;
      height: 100%;
      span {
        color: white;
        font-size: 1vw;
      }
      span:nth-child(1) {
        margin-right: 0.5vw;
        color: rgba(255, 255, 255, 0.6);
      }
      span:nth-child(2) {
        color: rgba(255, 255, 255, 0.6);
      }
    }
  }
`;

function ChatableList() {
  return (
    <Wrapper>
      <div id="img_container">
        <div>
          <img
            src="https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202206/09/SpoHankook/20220609195400821fzao.jpg"
            alt=""
          />
        </div>
      </div>
      <div id="content_box">
        <div>
          <span>NOBLE FANDOM 공식계정</span>
        </div>
        <div>
          <span>@helloworlrd</span>
        </div>
      </div>
    </Wrapper>
  );
}

export default ChatableList;
