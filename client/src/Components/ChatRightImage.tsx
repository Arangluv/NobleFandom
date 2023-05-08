import styled from "styled-components";

const ChatRightBox = styled.div`
  width: 100%;
  min-height: 10vw;
  height: auto;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: 1vw;
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
  margin-right: 0.5vw;
  justify-content: center;
  align-items: flex-end;
  small {
    font-size: 1vw;
    color: rgba(255, 255, 255, 0.7);
  }
`;

function ChatRightImage() {
  return (
    <ChatRightBox>
      <ChatTime>
        <small>23시 21분</small>
      </ChatTime>
      <ChatContentBox>
        <img
          src="https://image.ytn.co.kr/general/jpg/2023/0118/202301181308466432_d.jpg"
          alt=""
        />
      </ChatContentBox>
    </ChatRightBox>
  );
}

export default ChatRightImage;
