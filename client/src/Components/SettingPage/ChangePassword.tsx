import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postChangePassword } from "../../api/user/usesApi";
import { toast } from "react-toastify";
import { useRecoilValue } from "recoil";
import { loginState } from "../../atoms/atoms";
import LoadingOverlay from "../LoadingOverlay";
import { useNavigate } from "react-router-dom";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 1vw;
`;
const ChangePasswordForm = styled.form`
  width: 80%;
  height: 30vw;
  margin-top: 3vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 1vw;
    input {
      width: 50%;
      background-color: black;
      border: 1px solid white;
      border-radius: 5px;
      height: 3vw;
      margin-top: 0.5vw;
      color: white;
      padding-left: 0.5vw;
    }
    input:focus {
      outline: none;
    }
    span {
      color: white;
      font-size: 1.2vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
  #alert_message {
    margin-top: 1vw;
    font-size: 1vw;
    color: rgba(255, 255, 255, 0.9);
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
  input[type="submit"] {
    width: 50%;
    height: 4vw;
    border: 1px solid white;
    background-color: black;
    box-shadow: ${(props) => props.theme.textShadow};
    border-radius: 10px;
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-top: 1vw;
    transition: 0.1s ease-in-out;
  }
  input[type="submit"]:hover {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
  }
  small {
    color: ${(props) => props.theme.textRedColor};
    font-weight: 600;
  }
`;
interface IProps {
  currentPassword: string;
  changePassword: string;
  changePasswordConfirm: string;
  extraError?: string;
}

function ChangePassword() {
  const { register, formState, handleSubmit, setError, watch, clearErrors } =
    useForm<IProps>();
  const userLoginState = useRecoilValue(loginState);
  const navigator = useNavigate();
  const { isLoading, data, mutate } = useMutation({
    mutationFn: postChangePassword,
    onSuccess: () => {
      toast.success("비밀번호 변경에 성공하였습니다");
      navigator("/main");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
  const onValid = (data: IProps) => {
    if (data.changePasswordConfirm !== data.changePassword) {
      setError("changePassword", {
        message: "변경할 비밀번호가 일치하지 않습니다",
      });
      return;
    }
    if (data.changePassword === data.currentPassword) {
      setError("extraError", {
        message: "변경하려는 비밀번호와 현재 비밀번호가 같습니다",
      });
      return;
    }
    mutate({
      changePassword: data.changePassword,
      changePasswordConfirm: data.changePasswordConfirm,
      currentPassword: data.currentPassword,
      userType: userLoginState.userType,
    });
  };
  return (
    <>
      <SettingSubList>
        <ChangePasswordForm onSubmit={handleSubmit(onValid)}>
          <label htmlFor="current_password">
            <span>현재 비밀번호</span>
            <input
              {...register("currentPassword", {
                required: "현재 비밀번호를 입력해주세요",
                minLength: {
                  value: 5,
                  message: "비밀번호는 최소 5자리 이상입니다",
                },
              })}
              id="current_password"
              type="password"
              placeholder="현재 비밀번호"
              onFocus={() => clearErrors("extraError")}
            />
          </label>
          {formState?.errors.currentPassword ? (
            <small>{formState.errors.currentPassword.message}</small>
          ) : null}
          <label htmlFor="change_password">
            <span>변경할 비밀번호</span>
            <input
              {...register("changePassword", {
                required: "변경할 비밀번호를 입력해주세요",
                minLength: {
                  value: 5,
                  message: "비밀번호는 최소 5자리 이상입니다",
                },
              })}
              id="change_password"
              type="password"
              placeholder="변경할 비밀번호"
              onFocus={() => clearErrors("extraError")}
            />
          </label>
          {formState?.errors.changePassword ? (
            <small>{formState.errors.changePassword.message}</small>
          ) : null}
          <label htmlFor="change_password_confirm">
            <span>비밀번호 확인</span>
            <input
              {...register("changePasswordConfirm", {
                required: "비밀번호 확인을 입력해주세요",
                minLength: {
                  value: 5,
                  message: "비밀번호는 최소 5자리 이상입니다",
                },
              })}
              id="change_password_confirm"
              type="password"
              placeholder="비밀번호 확인"
              onFocus={() => clearErrors("extraError")}
            />
          </label>
          {formState?.errors.extraError ? (
            <small>{formState.errors.extraError.message}</small>
          ) : null}
          <span id="alert_message">
            <span>* 이메일로 가입한 유저만</span> 해당되며, SNS로 가입한 경우
            해당 SNS의 비밀번호를 바꿔주세요
          </span>
          <input type="submit" />
        </ChangePasswordForm>
      </SettingSubList>
      {isLoading ? <LoadingOverlay isLoading={isLoading} /> : null}
    </>
  );
}

export default ChangePassword;
