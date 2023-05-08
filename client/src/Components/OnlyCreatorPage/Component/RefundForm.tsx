import styled from "styled-components";
import { TiDelete } from "react-icons/ti";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  button {
    width: 100%;
    font-weight: 600;
    background-color: black;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    font-size: 1.5vw;
    border-radius: 10px;
    padding: 1vw 0;
    margin-top: 1vw;
    transition: all 0.1s ease-in-out;
  }
  button:hover {
    color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
    cursor: pointer;
  }
`;
const Title = styled.div`
  width: 100%;
  height: 3vw;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  h2 {
    color: white;
    font-weight: 600;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  span {
    position: absolute;
    display: flex;
    align-items: center;
    right: 0.5vw;
    font-size: 2.5vw;
    color: ${(props) => props.theme.accentColor};
    svg:hover {
      cursor: pointer;
    }
  }
`;
const RefundContent = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1vw;
  display: flex;
  padding: 2vw 0;
  border: 1px solid rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  & > div:first-child {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      font-size: 1.2vw;
      margin-bottom: 0.5vw;
    }
    & > span:first-child {
      font-weight: 600;
    }
  }
  & > div:last-child {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-right: 1vw;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      font-size: 1.2vw;
      margin-bottom: 0.5vw;
    }
    & > span:first-child {
      font-weight: 600;
    }
  }
`;
const RefundNotice = styled.div`
  width: 100%;
  height: auto;
  p {
    color: rgba(255, 255, 255, 0.7);
    padding: 1vw;
    font-size: 1.1vw;
  }
`;
function RefundForm() {
  return (
    <Wrapper>
      <Title>
        <h2>정산 신청</h2>
        <span>
          <TiDelete />
        </span>
      </Title>
      <RefundContent>
        <div>
          <span>총 수령액</span>
          <span>정기 구독</span>
          <span>크라운코인</span>
        </div>
        <div>
          <span>₩230,000</span>
          <span>₩130,000</span>
          <span>₩100,000</span>
        </div>
      </RefundContent>
      <RefundNotice>
        <p>
          환전에 대한 작은 설명 및 노티스가 들어가는 부분입니다. 예를들어 1코인
          = ₩110, 구독금액 ₩30000일때 일정 수수료 30%를 제외한.. 블라블라
          회원님은 "3등급"으로 수수료 30%를 떼고 환전받습니다. (규정보기)
        </p>
      </RefundNotice>
      <button>정산 신청하기</button>
    </Wrapper>
  );
}

export default RefundForm;
