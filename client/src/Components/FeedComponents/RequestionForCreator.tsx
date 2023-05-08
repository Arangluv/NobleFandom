import styled from "styled-components";
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";
import Feed from "../Feed";
import PremiumFeed from "./PremiumFeed";
import OnlyBuyerFeed from "./OnlyBuyerFeed";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  margin-bottom: 1.5vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding-bottom: 1vw;
`;
const UserRequestContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 1vw;
  width: 100%;
  height: auto;
  & > span {
    width: 100%;
    padding: 0 1vw;
    display: flex;
    margin-bottom: 1vw;
    justify-content: space-between;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    svg {
      color: rgba(255, 255, 255, 0.5);
      font-size: 2vw;
    }
  }
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    p {
      width: 90%;
      border-radius: 10px;
      padding: 1.5vw 2vw;
      font-size: 1.1vw;
      color: white;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
`;
const CreatorResMessageBox = styled.div`
  width: 100%;
  height: auto;
  text-align: center;
  color: ${(props) => props.theme.accentColor};
  text-shadow: ${(props) => props.theme.textShadow};
  margin: 3vw 0;
`;

const CreatorResponseBox = styled.div`
  width: 90%;
  height: auto;
`;
function RequestionForCreator() {
  return (
    <Wrapper>
      <UserRequestContent>
        <span>
          <RiDoubleQuotesL />
          <span>"귀여움이 넘치는 아랑"님의 리퀘스트 내용이에요</span>
          <RiDoubleQuotesR />
        </span>
        <div>
          <p>
            리퀘스트 내용이 들어갑니다!리퀘스트 내용이 들어갑니다!리퀘스트
            내용이 들어갑니다! 리퀘스트 내용이 들어갑니다! 리퀘스트 내용이
            들어갑니다! 리퀘스트 내용이 들어갑니다!리퀘스트 내용이 들어갑니다
          </p>
        </div>
      </UserRequestContent>
      <CreatorResMessageBox>
        <span>크리에이터가 응답했어요!</span>
      </CreatorResMessageBox>
      <CreatorResponseBox>
        <OnlyBuyerFeed />
      </CreatorResponseBox>
    </Wrapper>
  );
}

export default RequestionForCreator;
