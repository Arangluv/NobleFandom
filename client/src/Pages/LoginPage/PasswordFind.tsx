import styled from "styled-components";
import SideBar from "../../Components/SideBar";
import BASE_URL from "../../url";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import PasswordChageForm from "../../Components/PasswordChangeForm";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  padding-bottom: 3vw;
  display: flex;
  background-color: black;
`;
const SubWrapper = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Title = styled.div`
  padding-top: 5vw;
  h1 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    font-size: 2.5vw;
    font-weight: 600;
  }
`;
const UserExistValidation = styled.form`
  width: 100%;
  margin-top: 2vw;
  min-height: 10%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-bottom: 1vw;
  padding: 1vw;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  small {
    color: ${(props) => props.theme.textRedColor};
    text-align: center;
    margin-top: 1vw;
  }
  label[for="email_for_find"] {
    display: flex;
    flex-direction: column;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 0.5vw;
    }
    input {
      background-color: black;
      color: white;
      border: 1px solid white;
      border-radius: 10px;
      padding: 0.7vw 1vw;
      width: 100%;
    }
    input:focus {
      outline: none;
      border-color: ${(props) => props.theme.accentColor};
    }
  }
  label[for="submit_for_find"] {
    display: flex;
    flex-direction: column;
    input {
      display: none;
    }
    span {
      margin-top: 1vw;
      border: 1px solid white;
      background-color: black;
      box-sizing: ${(props) => props.theme.textShadow};
      padding: 1vw 0;
      border-radius: 10px;
      text-align: center;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      transition: all 0.1s ease-in-out;
    }
    span:hover {
      cursor: pointer;
      border-color: ${(props) => props.theme.accentColor};
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const EmailValidationForm = styled.form`
  width: 100%;
  min-height: 20%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1vw;
  margin-bottom: 1vw;
  small {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1vw;
    text-align: center;
    margin-bottom: 0.5vw;
  }
  div:first-child {
    margin-bottom: 2vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    small {
      color: ${(props) => props.theme.accentColor};
    }
  }
  #auth_error_message {
    margin-top: 1vw;
    color: ${(props) => props.theme.textRedColor};
  }
  #auth_input_form {
    display: flex;
    justify-content: center;
    input[type="number"] {
      width: 50%;
      height: 60px;
      text-align: center;
      padding: 0.7vw 0;
      background-color: black;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border: 1px solid white;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus {
        outline: none;
      }
      &::placeholder {
        color: rgba(255, 255, 255, 0.5);
        text-shadow: none;
      }
    }
    input[type="submit"] {
      width: 10%;
      height: 60px;
      padding: 0.7vw 0;
      background-color: black;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border: 1px solid white;
      font-size: 1.3vw;
      font-weight: 600;
      color: ${(props) => props.theme.accentColor};
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
interface EmailProps {
  email: string;
  extraError?: string;
}
interface AProps {
  success: boolean;
  message: string;
}
function PasswordFind() {
  const { register, formState, setError, handleSubmit, clearErrors } =
    useForm<EmailProps>();
  const [isUserExist, setIsUserExist] = useState(false);
  const [authNumber, setAuthNumber] = useState<Number | null>(null);
  const [emailToFindPassword, setEamilToFindPassword] = useState("");
  const [userInputAuth, setUserInputAuth] = useState<Number | null>(null);
  const [authError, setAuthError] = useState<AProps | null>(null);
  const [inputCount, setInputCount] = useState(5);
  const navigator = useNavigate();
  const handleSubmitClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userInputAuth !== authNumber) {
      setInputCount((pre) => pre - 1);
      setAuthError({
        success: false,
        message: "인증번호가 일치하지 않습니다",
      });
      return;
    }
    setAuthError({
      success: true,
      message: "",
    });
  };
  useEffect(() => {
    if (inputCount === 0) {
      window.alert("5회 이상 틀렸기에 홈으로 이동합니다");
      navigator("/");
    }
  }, [inputCount]);
  const onEmailValid = async (data: EmailProps) => {
    await axios
      .post(`${BASE_URL}/user-find`, {
        email: data.email,
      })
      .then((result) => {
        console.log(result);
        setIsUserExist(true);
        setEamilToFindPassword(data.email);
      })
      .catch((error: any) => {
        console.log(error);
        setError("extraError", {
          message: error?.response?.data?.message,
        });
      });
  };
  const sendAuthEmail = async (authNumber: number) => {
    await axios
      .post(`${BASE_URL}/password-find`, {
        authNumber,
        email: emailToFindPassword,
      })
      .then(() => {
        toast.success("해당 계정으로 인증메일을 보냈습니다!");
      })
      .catch(() => {
        toast.error("이메일을 보내는데 문제가 발생했습니다");
      });
  };
  useEffect(() => {
    if (!isUserExist) {
      return;
    }
    const randomNumber = Math.floor(Math.random() * 888888) + 111111;
    setAuthNumber(randomNumber);
    sendAuthEmail(randomNumber);
  }, [isUserExist]);
  return (
    <Wrapper>
      <SideBar />
      <SubWrapper>
        <Title>
          <h1>비밀번호 찾기</h1>
        </Title>
        <UserExistValidation onSubmit={handleSubmit(onEmailValid)}>
          <label htmlFor="email_for_find">
            <span>이메일</span>
            <input
              {...register("email", {
                required: "비밀번호를 찾고자 하는 이메일을 입력해주세요",
                pattern: {
                  value: /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                  message: "이메일 형식이 아닙니다",
                },
              })}
              id="email_for_find"
              type="text"
              onFocus={() => clearErrors("extraError")}
            />
          </label>
          {formState?.errors?.email ? (
            <small>{formState.errors.email.message}</small>
          ) : null}
          <label htmlFor="submit_for_find">
            <span>비밀번호 찾기</span>
            <input id="submit_for_find" type="submit" />
          </label>
          {formState?.errors?.extraError ? (
            <small>{formState.errors.extraError.message}</small>
          ) : null}
        </UserExistValidation>
        {isUserExist ? (
          <EmailValidationForm onSubmit={handleSubmitClick}>
            <div>
              <small>해당 이메일로 인증번호를 보내드렸습니다.</small>
              <small>
                인증번호가 보이지 않으시면 스팸메일함을 확인해보시기 바랍니다
              </small>
            </div>
            <small id="auth_count_message">{`인증번호 입력이 ${inputCount}회 남았습니다`}</small>
            <div id="auth_input_form">
              <input
                onChange={(event) =>
                  setUserInputAuth(Number(event.target.value))
                }
                placeholder="인증번호를 입력해주세요"
                type="number"
              />
              <input type="submit" value="인증" />
            </div>
            {authError !== null && authError.success === false ? (
              <small id="auth_error_message">{authError.message}</small>
            ) : null}
          </EmailValidationForm>
        ) : null}

        {authError !== null && authError.success ? (
          <PasswordChageForm email={emailToFindPassword} />
        ) : null}
      </SubWrapper>
    </Wrapper>
  );
}

export default PasswordFind;
