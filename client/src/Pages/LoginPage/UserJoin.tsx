import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BASE_URL from "../../url";
import SideBar from "../../Components/SideBar";
import { AiOutlineCheck } from "react-icons/ai";
import uuid from "react-uuid";
import axios from "axios";
const Wrapper = styled.div`
  height: 250vh;
  width: 100%;
  background-color: black;
  display: flex;
`;
const SubWrapper = styled.div`
  width: 75%;
  border-left: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: ${(props) => props.theme.textShadow};
  h2 {
    margin-top: 5vw;
    width: 80%;
    font-size: 2vw;
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-bottom: 2vw;
  }
`;
const JoinForm = styled.form`
  width: 80%;
  #terms_agree_notice {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1vw;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 1vw;
    border-radius: 10px;
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
  }
`;
const EmailLabel = styled.label`
  color: white;
  text-shadow: ${(props) => props.theme.textShadow};
  display: flex;
  flex-direction: column;
  input[type="text"] {
    color: white;
    width: 60%;
    margin-top: 0.5vw;
    padding: 0.8vw 1vw;
    border: 1px solid white;
    background-color: black;
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.textShadow};
  }
  input[type="text"]:focus {
    outline: none;
    border-color: ${(props) => props.theme.accentColor};
  }
  span {
    display: flex;
    align-items: center;
    small {
      font-size: 1vw;
      color: ${(props) => props.theme.textRedColor};
      font-weight: 600;
      margin-left: 1vw;
      text-shadow: none;
    }
  }
`;
const UsernameLabel = styled.label`
  color: white;
  text-shadow: ${(props) => props.theme.textShadow};
  display: flex;
  flex-direction: column;
  margin-top: 1vw;
  span {
    display: flex;
    align-items: center;
    small {
      font-size: 1vw;
      color: ${(props) => props.theme.textRedColor};
      font-weight: 600;
      margin-left: 1vw;
      text-shadow: none;
    }
  }
  input[type="text"] {
    width: 50%;
    color: white;
    margin-top: 0.5vw;
    padding: 0.8vw 1vw;
    border: 1px solid white;
    background-color: black;
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.textShadow};
  }
  input[type="text"]:focus {
    outline: none;
    border-color: ${(props) => props.theme.accentColor};
  }
`;
const PasswordLabel = styled.label`
  color: white;
  text-shadow: ${(props) => props.theme.textShadow};
  display: flex;
  flex-direction: column;
  margin-top: 1vw;
  span {
    display: flex;
    align-items: center;
    small {
      font-size: 1vw;
      color: ${(props) => props.theme.textRedColor};
      font-weight: 600;
      margin-left: 1vw;
      text-shadow: none;
    }
  }
  input[type="password"] {
    width: 50%;
    margin-top: 0.5vw;
    padding: 0.8vw 1vw;
    border: 1px solid white;
    background-color: black;
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.textShadow};
    color: white;
  }
  input[type="password"]:focus {
    outline: none;
    border-color: ${(props) => props.theme.accentColor};
  }
`;
const TermsLabel = styled.label<IProps>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1vw;
  padding: 1vw;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  border: ${(props) => (props.termsCheck ? "1px solid white" : "none")};
  border-color: ${(props) =>
    props.termsCheck ? props.theme.accentColor : "none"};
  &:hover {
    cursor: pointer;
  }
  span {
    color: ${(props) => (props.termsCheck ? props.theme.accentColor : "white")};
    text-shadow: ${(props) => props.theme.textShadow};
    display: flex;
    align-items: center;
    small {
      font-size: 1vw;
      color: ${(props) => props.theme.textRedColor};
      font-weight: 600;
      margin-left: 1vw;
      text-shadow: none;
    }
  }

  svg {
    font-size: 1.5vw;
    color: ${(props) =>
      props.termsCheck ? props.theme.accentColor : "rgba(255, 255, 255, 0.4)"};
  }
  input[type="checkbox"] {
    display: none;
  }
`;
const ErrorMsgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1vw;
  span {
    color: ${(props) => props.theme.textRedColor};
    font-size: 1.3vw;
  }
`;
const SubmitLabel = styled.label`
  width: 100%;
  margin-top: 1vw;
  border: 1px solid ${(props) => props.theme.accentColor};
  box-shadow: ${(props) => props.theme.textShadow};
  display: flex;
  justify-content: center;
  padding: 0.8vw 0;
  border-radius: 10px;
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
    background-color: white;
  }
  span {
    font-size: 1.4vw;
    font-weight: 600;
    color: ${(props) => props.theme.accentColor};
  }
  input[type="submit"] {
    display: none;
  }
`;
interface IProps {
  termsCheck: boolean;
}
interface IForm {
  email: string;
  username: string;
  password: string;
  passwordConfirm: string;
  phoneVerify: boolean;
  terms: boolean;

  extraError?: string;
  // terms?: string; 필수가 아닌경우 저렇게 물음표를 붙인다.
}
function UserJoin() {
  const [termsCheck, setTermsCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState, setError } = useForm<IForm>();
  const navigator = useNavigate();
  const onValid = async (data: IForm) => {
    setLoading(true);
    if (data.password !== data.passwordConfirm) {
      setError(
        "password",
        { message: "비밀번호가 다릅니다" },
        { shouldFocus: true }
      );
      setLoading(false);
      return;
    }
    try {
      await axios.post(
        `${BASE_URL}/join`,
        {
          email: data.email,
          username: data.username,
          password: data.password,
          passwordConfirm: data.passwordConfirm,
          userId: uuid().split("-")[0],
        },
        { withCredentials: true }
      );
      setLoading(false);
      navigator("/main");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.response?.data?.message);
      setLoading(false);
    }
  };
  return (
    <Wrapper>
      <SideBar />
      <SubWrapper>
        <h2>회원가입</h2>
        <JoinForm onSubmit={handleSubmit(onValid)}>
          <EmailLabel>
            <span>
              이메일
              {formState?.errors?.email?.message ? (
                <small>{formState?.errors.email?.message}</small>
              ) : null}
            </span>
            <input
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "이메일 형식이어야 합니다",
                },
              })}
              type="text"
              placeholder="이메일"
            />
          </EmailLabel>
          <UsernameLabel>
            <span>
              닉네임
              {formState?.errors?.username?.message ? (
                <small>{formState?.errors.username?.message}</small>
              ) : null}
            </span>
            <input
              {...register("username", {
                required: "닉네임을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "닉네임은 최소 두글자 이상으로 해주세요",
                },
              })}
              type="text"
              placeholder="닉네임"
            />
          </UsernameLabel>
          <PasswordLabel>
            <span>
              비밀번호
              {formState?.errors?.password?.message ? (
                <small>{formState?.errors.password?.message}</small>
              ) : null}
            </span>
            <input
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 5,
                  message: "비밀번호는 최소 5자리 이상입니다",
                },
              })}
              type="password"
              placeholder="비밀번호"
            />
          </PasswordLabel>
          <PasswordLabel>
            <span>
              비밀번호 확인
              {formState?.errors?.passwordConfirm?.message ? (
                <small>{formState?.errors.passwordConfirm?.message}</small>
              ) : null}
            </span>
            <input
              {...register("passwordConfirm", {
                required: "비밀번호 확인란을 입력해주세요",
                minLength: {
                  value: 5,
                  message: "비밀번호는 최소 5자리 이상입니다",
                },
              })}
              type="password"
              placeholder="비밀번호 확인"
            />
          </PasswordLabel>

          <TermsLabel htmlFor="terms_agree_check" termsCheck={termsCheck}>
            <span>
              이용약관
              {formState?.errors?.terms?.message ? (
                <small>{formState?.errors.terms?.message}</small>
              ) : null}
            </span>
            <AiOutlineCheck />
            <input
              {...register("terms", { required: "약관에 동의해주세요" })}
              id="terms_agree_check"
              onClick={() => setTermsCheck((pre) => !pre)}
              type="checkbox"
            />
          </TermsLabel>
          <span id="terms_agree_notice">
            서비스 이용약관 및 개인정보처리방침을 확인 후 동의하며, 19세
            이상입니다
          </span>
          {errorMsg ? (
            <ErrorMsgBox>
              <span>{errorMsg}</span>
            </ErrorMsgBox>
          ) : null}
          <SubmitLabel>
            <span>회원가입</span>
            <input disabled={loading} type="submit" />
          </SubmitLabel>
        </JoinForm>
      </SubWrapper>
    </Wrapper>
  );
}

export default UserJoin;
