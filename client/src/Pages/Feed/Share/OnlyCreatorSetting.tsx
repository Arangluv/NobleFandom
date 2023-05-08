import { Link, Outlet } from "react-router-dom";
import styled from "styled-components";
import { RiVipLine } from "react-icons/ri";
const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  background-color: black;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 1.5vw;
  border-left: 1px solid white;
  margin-left: 2vw;
`;
const SubWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  padding-bottom: 1vw;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vw;
  h1 {
    color: ${(props) => props.theme.accentColor};
    font-size: 1.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  svg {
    color: ${(props) => props.theme.accentColor};
    font-size: 1.5vw;
    margin-right: 0.3vw;
  }
`;
const SettingOptionList = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  ul {
    margin-top: 1vw;
    a {
      display: block;
      color: white;
      font-size: 1.5vw;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 1vw;
      transition: all 0.1s ease-in-out;
    }
    a:hover {
      text-shadow: ${(props) => props.theme.accentColor};
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
function OnlyCreatorSetting() {
  return (
    <Wrapper>
      <SubWrapper>
        <SettingOptionList>
          <Title>
            <RiVipLine />
            <h1>크리에이터 페이지</h1>
          </Title>
          <ul>
            <Link to="refunds">
              <li>정산신청</li>
            </Link>
            <Link to="myfans">
              <li>내 팬덤</li>
            </Link>
            <Link to="income">
              <li>수입현황</li>
            </Link>
            <Link to="message">
              <li>메세지 세팅하기</li>
            </Link>
            <Link to="membership">
              <li>멤버쉽플랜 설정</li>
            </Link>
          </ul>
        </SettingOptionList>
        <Outlet />
      </SubWrapper>
    </Wrapper>
  );
}

export default OnlyCreatorSetting;
