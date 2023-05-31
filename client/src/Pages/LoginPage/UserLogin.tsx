import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AiFillFacebook } from "react-icons/ai";
import SideBar from "../../Components/SideBar";
import GoogleLoginBnt from "./GoogleLoginBnt";
import { useForm } from "react-hook-form";
import axios from "axios";
import BASE_URL from "../../url";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import { useRecoilState, useSetRecoilState } from "recoil";
import { loginState } from "../../atoms/atoms";
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
    input[type="text"] {
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
    small {
      margin-bottom: 1vw;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 1.1vw;
      color: ${(props) => props.theme.textRedColor};
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
      cursor: pointer;
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
const Overlay = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
`;
const OverlayBox = styled.div`
  width: 300px;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface DataProps {
  email: string;
  password: string;
  extraError?: string;
}
function UserLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [userLoginState, setUserLoginState] = useRecoilState(loginState);
  const navigator = useNavigate();
  const { register, watch, formState, setError, handleSubmit, clearErrors } =
    useForm<DataProps>();
  let googleOauthClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || "";

  const onValid = async (data: DataProps) => {
    setIsLoading(true);
    await axios
      .post(
        `${BASE_URL}/login`,
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((result) => {
        const { data } = result;
        delete data.message;
        console.log(data);
        setUserLoginState({ ...data });
        setIsLoading(false);
        navigator("/", { replace: true });
      })
      .catch((error) => {
        setIsLoading(false);
        setError("extraError", {
          message: error.response.data.message,
        });
      });
  };

  // Invalid Access Check
  useEffect(() => {
    if (userLoginState.userType === "") {
      return;
    }
    navigator("/main", { replace: true });
  }, []);
  return (
    <>
      <Wrapper>
        <SideBar />
        <SubWrapper>
          <LoginToEmailBox>
            <Link to="/">NOBLE FANDOM</Link>
            <form onSubmit={handleSubmit(onValid)}>
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "이메일 형식이 아닙니다",
                  },
                })}
                onFocus={() => clearErrors("extraError")}
                type="text"
                placeholder="이메일"
              />
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                })}
                onFocus={() => clearErrors("extraError")}
                type="password"
                placeholder="비밀번호"
              />
              {formState.errors ? (
                <small>
                  {formState.errors?.email?.message ||
                    formState.errors?.password?.message ||
                    formState.errors?.extraError?.message}
                </small>
              ) : null}
              <input type="submit" value="로그인" />
              <Link to="/join">회원가입</Link>
            </form>
            <span>비밀번호를 잊으셨나요?</span>
          </LoginToEmailBox>
          <SocialLoginBox>
            <span>SNS로 로그인하기 </span>
            <GoogleOAuthProvider clientId={googleOauthClientId}>
              <GoogleLoginBnt setError={setError} setIsLoading={setIsLoading} />
            </GoogleOAuthProvider>
            <button>
              <AiFillFacebook />
              <span>페이스북 로그인</span>
            </button>
          </SocialLoginBox>
        </SubWrapper>
      </Wrapper>
      {isLoading ? (
        <Overlay>
          <OverlayBox>
            <HashLoader color="#f1c40f" loading={isLoading} />
          </OverlayBox>
        </Overlay>
      ) : null}
    </>
  );
}

export default UserLogin;
