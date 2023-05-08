import { Link } from "react-router-dom";
import styled from "styled-components";
import { AiFillFacebook, AiFillGoogleSquare } from "react-icons/ai";
import { SiKakaotalk } from "react-icons/si";
import SideBar from "../../Components/SideBar";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background-color: black;
`;
const SubWrapper = styled.div`
  width: 60%;
  border-left: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const LoginToEmailBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 5vw;
  a {
    color: ${(props) => props.theme.bgColor};
    font-size: 3vw;
    font-weight: 700;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  form {
    display: flex;
    width: 60%;
    flex-direction: column;
    margin-top: 2vw;
    input[type="password"],
    input[type="email"] {
      margin-bottom: 1vw;
      background-color: black;
      padding: 1vw;
      padding-left: 1.3vw;
      border-radius: 15px;
      width: 100%;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      color: white;
      transition: 0.1s ease-in-out;
    }
    input::placeholder {
      color: white;
    }
    input:focus {
      outline: none;
    }
    input[type="submit"] {
      font-size: 1.2vw;
      background-color: rgba(241, 196, 15, 0.9);
      color: white;
      padding: 1vw;
      border-radius: 15px;
      border: 1px solid white;
      margin-bottom: 1vw;
      text-shadow: ${(props) => props.theme.textShadow};
      box-shadow: ${(props) => props.theme.textShadow};
    }
    input[type="submit"]:hover {
      cursor: pointer;
      box-shadow: #fbc531 0px 0px 10px;
      background-color: rgba(241, 196, 15, 1);
    }
    a {
      display: block;
      color: white;
      font-size: 1.2vw;
      text-align: center;
      border-radius: 15px;
      padding: 1vw;
      width: 100%;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      transition: 0.1s ease-in-out;
    }
    a:hover {
      box-shadow: #fbc531 0px 0px 10px;
    }
  }
  span {
    color: white;
    display: flex;
    justify-content: flex-end;
    width: 60%;
    margin-top: 0.5vw;
    font-size: 1vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  span:hover {
    cursor: pointer;
  }
`;
const SocialLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  align-items: center;
  margin-top: 2vw;
  button {
    margin-bottom: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    width: 100%;
    background-color: ${(props) => props.theme.accentColor};
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    padding: 1vw 2vw;
    border-radius: 15px;
    background-color: ${(props) => props.theme.textColor};
    transition: 0.1s ease-in-out;
    &:hover {
      box-shadow: #fbc531 0px 0px 10px;
    }
    span {
      margin-left: 1vw;
      text-shadow: ${(props) => props.theme.textShadow};
      font-size: 1.2vw;
      color: white;
    }

    svg {
      color: white;
      width: 2vw;
      height: 2vw;
    }

    & > svg:nth-child(2) {
      color: blue;
      width: 2vw;
      height: 2vw;
    }
  }
  span:nth-child(1) {
    color: ${(props) => props.theme.bgColor};
    text-shadow: ${(props) => props.theme.textShadow};
    display: block;
    margin-bottom: 1vw;
  }
`;
function Login() {
  return (
    <Wrapper>
      <SideBar />
      <SubWrapper>
        <LoginToEmailBox>
          <Link to="/">NOBLE FANDOM</Link>
          <form>
            <input type="email" placeholder="이메일" />
            <input type="password" placeholder="비밀번호" />
            <input type="submit" value="로그인" />
            <Link to="/join">회원가입</Link>
          </form>
          <span>비밀번호를 잊으셨나요?</span>
        </LoginToEmailBox>
        <SocialLoginBox>
          <span>SNS로 로그인하기 </span>
          <button>
            <AiFillGoogleSquare />
            <span>구글 로그인</span>
          </button>
          <button>
            <AiFillFacebook />
            <span>페이스북 로그인</span>
          </button>
          <button>
            <SiKakaotalk />
            <span>카카오톡 로그인</span>
          </button>
        </SocialLoginBox>
      </SubWrapper>
    </Wrapper>
  );
}

export default Login;
