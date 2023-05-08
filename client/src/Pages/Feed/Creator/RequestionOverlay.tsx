import styled from "styled-components";
import { GiCrownCoin } from "react-icons/gi";
const RequestionForm = styled.form`
  width: 100%;
  height: auto;
`;
const Title = styled.div`
  width: 100%;
  padding-bottom: 0.5vw;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  h2 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  small {
    margin-top: 0;
    color: rgba(255, 255, 255, 0.6);
    font-size: 1vw;
  }
`;
const RequestContentLabel = styled.label`
  margin-top: 2vw;
  display: flex;
  flex-direction: column;
  padding-bottom: 1vw;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  span {
    color: white;
    font-size: 1.2vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  textarea {
    margin-top: 0.5vw;
    width: 100%;
    height: 15vw;
    background-color: black;
    border-radius: 10px;
    border: 1px solid white;
    color: white;
    padding: 1vw;
  }
  textarea:focus {
    outline: none;
  }
  div {
    display: flex;
    flex-direction: column;
    padding: 1vw;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.1);
    margin-top: 1vw;
    small {
      margin-top: 0.5vw;
      margin-bottom: 0.5vw;
      font-size: 1.1vw;
      color: ${(props) => props.theme.accentColor};
      text-shadow: ${(props) => props.theme.textShadow};
    }
    .request_description {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1vw;
      text-shadow: none;
      span {
        font-size: 1vw;
        text-shadow: none;
        color: rgba(241, 196, 15, 0.9);
        font-weight: 600;
      }
    }
  }
`;
const RequestPriceSetting = styled.label`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  span {
    color: white;
    font-size: 1.2vw;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-bottom: 0.5vw;
  }
  div {
    display: flex;
    align-items: center;
    margin-top: 0.5vw;
    svg {
      color: ${(props) => props.theme.accentColor};
      font-size: 2vw;
      margin-right: 0.5vw;
    }
    input[type="number"] {
      background-color: inherit;
      border: none;
      border-bottom: 1px solid white;
      text-align: center;
      padding-bottom: 0.5vw;
      color: white;
    }
    input[type="number"]:focus {
      outline: none;
      border-color: ${(props) => props.theme.accentColor};
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    small {
      font-size: 1vw;
      margin-left: 3vw;
      color: ${(props) => props.theme.textRedColor};
    }
  }
`;
const RequestSubmit = styled.label`
  display: flex;
  flex-direction: column;
  border: 1px solid ${(props) => props.theme.accentColor};
  border-radius: 10px;
  padding: 0.8vw 0;
  justify-content: center;
  align-items: center;
  margin-top: 2vw;
  transition: all 0.2s ease-in-out;
  span {
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
  }
  input[type="submit"] {
    display: none;
  }
  &:hover {
    cursor: pointer;
    background-color: white;
  }
`;
function RequestionOverlay() {
  return (
    <RequestionForm>
      <Title>
        <h2>리퀘스트 신청하기</h2>
        <small>크리에이터에게 리퀘스트를 요청할 수 있어요!</small>
      </Title>
      <RequestContentLabel htmlFor="request_content">
        <span>리퀘스트 내용</span>
        <textarea
          id="request_content"
          placeholder="리퀘스트 내용을 적어주세요"
        />
        <div>
          <small>리퀘스트란?</small>
          <span className="request_description">
            크리에이터에게 일정 금액을 제시하고, 원하는 컨텐츠 내용을
            적어주세요.
          </span>
          <span className="request_description">
            리퀘스트는{" "}
            <span>
              크리에이터만 열람할 수 있으며, 크리에이터가 승낙 후 공개
            </span>
            됩니다.
          </span>
          <span className="request_description">
            리퀘스트 신청 후 설정한 코인 수 만큼 빠져나가게 되며,{" "}
            <span>3일동안 유지</span> 됩니다.
          </span>
          <span className="request_description">
            <span>크리에이터가 승낙하지 않는다면 자동으로 코인은 환불</span>
            되며, <span>도중 철회가 가능</span>합니다
          </span>
        </div>
      </RequestContentLabel>
      <RequestPriceSetting htmlFor="request_price_setting">
        <span>가격설정</span>
        <div>
          <GiCrownCoin />
          <input type="number" id="request_price_setting" />
          <small>0코인 이상이어야합니다</small>
        </div>
      </RequestPriceSetting>
      <RequestSubmit htmlFor="request_submit">
        <span>신청하기</span>
        <input id="request_submit" type="submit" />
      </RequestSubmit>
    </RequestionForm>
  );
}

export default RequestionOverlay;
