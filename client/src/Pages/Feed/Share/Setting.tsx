import styled from "styled-components";
import { BsFillGearFill } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { loginState } from "../../../atoms/atoms";
import { useEffect } from "react";
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
    color: white;
    font-size: 1.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  svg {
    color: white;
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
  button {
    margin-top: 2vw;
    background-color: black;
    border: 1px solid white;
    border-radius: 20px;
    box-shadow: ${(props) => props.theme.textShadow};
    padding: 1vw;
    color: white;
    transition: all 0.1s ease-in-out;
  }
  button:hover {
    cursor: pointer;
    box-shadow: ${(props) => props.theme.textRedShadow};
  }
`;
function Setting() {
  const userLoginState = useRecoilValue(loginState);
  const navigator = useNavigate();
  useEffect(() => {
    if (userLoginState.userType === "") {
      navigator("/");
      return;
    }
  }, []);
  return (
    <Wrapper>
      <SubWrapper>
        <SettingOptionList>
          <Title>
            <BsFillGearFill />
            <h1>설정</h1>
          </Title>
          <ul>
            <Link to="profile">
              <li>프로필 설정</li>
            </Link>
            <Link to="account">
              <li>계정설정</li>
            </Link>
            {userLoginState.userType === "creator" ? (
              <Link to="block">
                <li>차단한 계정</li>
              </Link>
            ) : null}
            <Link to="apply-creator">
              <li>크리에이터 신청</li>
            </Link>
            <Link to="payment-methods">
              <li>결제 수단관리</li>
            </Link>
            <Link to="billing-history">
              <li>결제 내역</li>
            </Link>
            <Link to="change-password">
              <li>비밀번호 변경</li>
            </Link>
          </ul>
          <button>로그아웃</button>
        </SettingOptionList>
        <Outlet />
      </SubWrapper>
    </Wrapper>
  );
}

export default Setting;
