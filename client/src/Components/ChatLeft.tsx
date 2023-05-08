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
  height: auto;
  margin-right: 0.5vw;
  p {
    border: 1px solid white;
    border-radius: 10px;
    white-space: pre-wrap;
    box-shadow: ${(props) => props.theme.textShadow};
    padding: 1vw;
    color: white;
    font-size: 1.1vw;
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
function ChatLeft() {
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
        <p>
          법관은 탄핵 또는 금고 이상의 형의 선고에 의하지 아니하고는 파면되지
          아니하며, 징계처분에 의하지 아니하고는 정직·감봉 기타 불리한 처분을
          받지 아니한다. 대한민국은 통일을 지향하며, 자유민주적 기본질서에
          입각한 평화적 통일 정책을 수립하고 이를 추진한다. 정당은 그
          목적·조직과 활동이 민주적이어야 하며, 국민의 정치적 의사형성에
          참여하는데 필요한 조직을 가져야 한다.
        </p>
      </ChatContentBox>
      <ChatTime>
        <small>23시 21분</small>
      </ChatTime>
    </ChatLeftBox>
  );
}

export default ChatLeft;
