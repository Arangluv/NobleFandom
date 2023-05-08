import styled from "styled-components";

const ChatLeftBox = styled.div`
  width: 100%;
  min-height: 10vw;
  height: auto;
  display: flex;
  align-items: flex-end;
  margin-bottom: 1vw;
`;
const ChatProfileBox = styled.div`
  width: 3vw;
  height: 3vw;
  margin-right: 0.5vw;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  div {
    width: 3vw;
    height: 3vw;
    border-radius: 100%;
    object-fit: contain;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
`;
const ChatContentBox = styled.div`
  width: 40%;
  margin-right: 0.5vw;
  height: 30vw;
  object-fit: contain;
  img {
    width: 100%;
    height: 100%;
  }
`;
const ChatTime = styled.div`
  width: 10%;
  height: 5vw;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  small {
    font-size: 1vw;
    color: rgba(255, 255, 255, 0.7);
  }
`;

function ChatLeftImage() {
  return (
    <ChatLeftBox>
      <ChatProfileBox>
        <div>
          <img
            src="https://image.ytn.co.kr/general/jpg/2023/0118/202301181308466432_d.jpg"
            alt=""
          />
        </div>
      </ChatProfileBox>
      <ChatContentBox>
        <img
          src="https://image.ytn.co.kr/general/jpg/2023/0118/202301181308466432_d.jpg"
          alt=""
        />
      </ChatContentBox>
      <ChatTime>
        <small>23시 21분</small>
      </ChatTime>
    </ChatLeftBox>
  );
}

export default ChatLeftImage;
