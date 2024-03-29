import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BASE_URL from "../../url";
import SideBar from "../../Components/SideBar";
import { AiOutlineCheck } from "react-icons/ai";
import uuid from "react-uuid";
import axios from "axios";
import { loginState } from "../../atoms/atoms";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
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
  #extra_error_message {
    display: flex;
    justify-content: center;
    color: ${(props) => props.theme.textRedColor};
    text-align: center;
    font-size: 1vw;
    margin-top: 1vw;
    width: 100%;
  }
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
  div {
    display: flex;
    align-items: center;
    margin-top: 0.5vw;
    input[type="text"] {
      color: white;
      width: 60%;
      padding: 0.8vw 1vw;
      border: 1px solid white;
      background-color: black;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      box-shadow: ${(props) => props.theme.textShadow};
      height: 40px;
    }
    button {
      height: 40px;
      background-color: ${(props) => props.theme.verifyColor};
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      padding: 0.8vw 2vw;
      color: white;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      &:hover {
        cursor: pointer;
      }
    }
    input[type="text"]:focus {
      outline: none;
      border-color: ${(props) => props.theme.accentColor};
    }
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
const EmailValidationLabel = styled.label`
  display: flex;
  margin-top: 1vw;
  flex-direction: column;

  #validation_notice {
    color: ${(props) => props.theme.accentColor};
    font-size: 1vw;
    margin-bottom: 1vw;
  }
  div {
    display: flex;
    align-items: center;
    input[type="number"],
    button {
      height: 40px;
      border: 1px solid white;
      background-color: black;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    button {
      padding: 0 2vw;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      background-color: ${(props) => props.theme.verifyColor};
      &:hover {
        cursor: pointer;
      }
    }
    input[type="number"] {
      width: 40%;
      text-align: center;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      &:focus {
        outline: none;
      }
    }
    input[type="number"]::placeholder {
      color: rgba(255, 255, 255, 0.5);
      text-shadow: none;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
    small {
      font-size: 1.1vw;
      color: ${(props) => props.theme.textRedColor};
      margin-left: 1vw;
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
  verifyNum: number;
  extraError?: string;
  // terms?: string; 필수가 아닌경우 저렇게 물음표를 붙인다.
}

function UserJoin() {
  const [termsCheck, setTermsCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { register, handleSubmit, formState, setError, watch, clearErrors } =
    useForm<IForm>();
  const navigator = useNavigate();
  const [userLoginState, setUserLoginState] = useRecoilState(loginState);
  const [verifyClick, setVerifyClick] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [authNumber, setAuthNumber] = useState<null | Number>(null);
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
    if (!emailValidation) {
      setError("extraError", {
        message: "이메일 인증은 필수 입니다",
      });
      setLoading(false);
      return;
    }
    try {
      const result = await axios.post(
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
      const newLoginState = {
        username: result.data.username,
        userType: result.data.userType,
        userId: result.data.userId,
        profileImg: result.data.profileImg,
        backGroundImg: result.data.backGroundImg,
        email: result.data.email,
        profileDescription: result.data.profileDescription,
        socialOnly: result.data.socialOnly,
      };
      setUserLoginState({ ...newLoginState });
      setLoading(false);
      navigator("/main");
    } catch (error: any) {
      console.log(error);
      setErrorMsg(error.response?.data?.message);
      setLoading(false);
    }
  };
  console.log(formState.errors);
  console.log(watch());
  // Invalid Access Check
  useEffect(() => {
    if (userLoginState.userType === "") {
      return;
    }
    navigator("/main", { replace: true });
  }, []);
  const handleVerifyEmailClick = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    clearErrors("extraError");
    const emailTest = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (emailTest.test(watch("email"))) {
      clearErrors("email");
      setVerifyClick(true);
      const randomNumber = Math.floor(Math.random() * 888888) + 111111;
      setAuthNumber(randomNumber);
      await axios
        .post(`${BASE_URL}/join-verify-email`, {
          authNumber: randomNumber,
          email: "12123",
        })
        .then(() => {
          toast.success("메일을 성공적으로 보냈습니다!");
        })
        .catch(() => {
          toast.error("메일을 보내는데 문제가 발생했습니다.");
        });
      return;
    }
    setError("email", {
      message: "이메일 형식이 아닙니다",
    });
  };

  const handleVerifyClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    clearErrors("extraError");
    if (Number(watch("verifyNum")) !== authNumber) {
      setError("verifyNum", {
        message: "인증에 실패했습니다",
      });
      toast.error("인증에 실패했습니다");
      return;
    }
    clearErrors("verifyNum");
    setEmailValidation(true);
    toast.success("인증에 성공했습니다!");
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
            <div>
              <input
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "이메일 형식이어야 합니다",
                  },
                })}
                readOnly={emailValidation}
                type="text"
                placeholder="이메일"
              />
              <button disabled={verifyClick} onClick={handleVerifyEmailClick}>
                인증번호 받기
              </button>
            </div>
          </EmailLabel>
          {verifyClick ? (
            <EmailValidationLabel>
              <span id="validation_notice">
                인증번호를 입력하신 메일로 보냈습니다. 확인 후 입력란에
                입력해주시고 인증버튼을 눌러주세요
              </span>
              <div>
                <input
                  {...register("verifyNum")}
                  type="number"
                  placeholder="인증번호를 입력해주세요"
                />
                <button disabled={emailValidation} onClick={handleVerifyClick}>
                  인증
                </button>
                {formState?.errors.verifyNum ? (
                  <small>{formState.errors.verifyNum.message}</small>
                ) : null}
              </div>
            </EmailValidationLabel>
          ) : null}
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
          {formState?.errors?.extraError ? (
            <small id="extra_error_message">
              {formState.errors.extraError.message}
            </small>
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
