import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { postPasswordFindAndChange } from "../api/user/usesApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay";

const Wrapper = styled.form`
  width: 100%;
  min-height: 20%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 1vw;
  border-radius: 10px;
  small {
    margin-bottom: 1vw;
    text-align: center;
    color: ${(props) => props.theme.textRedColor};
  }
  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 1vw;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 0.5vw;
    }
    input {
      width: 70%;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      background-color: black;
      padding: 0.7vw 1vw;
      color: white;
      border-radius: 10px;
      transition: all 0.1s ease-in-out;
      &:focus {
        outline: none;
        border-color: ${(props) => props.theme.accentColor};
      }
    }
  }
  label[for="submit_to_chage_password"] {
    margin-bottom: 0;
    input {
      display: none;
    }
    span {
      text-align: center;
      border: 1px solid white;
      border-radius: 10px;
      font-size: 1.3vw;
      font-weight: 600;
      padding: 1vw 0;
      margin-top: 1vw;
      transition: all 0.1s ease-in-out;
    }
    span:hover {
      cursor: pointer;
      color: ${(props) => props.theme.accentColor};
      border-color: ${(props) => props.theme.accentColor};
    }
  }
`;
interface IProps {
  email: string;
}
interface DProps {
  password: string;
  passwordConfirm: string;
  extraError?: string;
}
function PasswordChageForm({ email }: IProps) {
  const { register, formState, setError, clearErrors, handleSubmit } =
    useForm<DProps>();
  const navigator = useNavigate();
  const { mutate, isLoading } = useMutation({
    mutationFn: postPasswordFindAndChange,
    onSuccess: () => {
      toast.success("비밀번호 변경이 완료되었습니다");
      navigator("/login", { replace: true });
    },
    onError: (error: any) => {
      toast.error(error.response.data.message);
    },
  });
  const onValid = (data: DProps) => {
    if (data.password !== data.passwordConfirm) {
      setError("password", {
        message: "비밀번호가 다릅니다",
      });
    }
    mutate({
      changePassword: data.password,
      email,
    });
  };
  return (
    <>
      <Wrapper onSubmit={handleSubmit(onValid)}>
        <label htmlFor="password_for_change">
          <span>변경할 비밀번호</span>
          <input
            {...register("password", {
              minLength: {
                value: 5,
                message: "비밀번호는 최소 5자리 이상으로 해주세요",
              },
            })}
            id="password_for_change"
            onFocus={() => clearErrors("extraError")}
            type="password"
          />
        </label>
        {formState?.errors?.password ? (
          <small>{formState?.errors?.password.message}</small>
        ) : null}
        <label htmlFor="password_for_change_confirm">
          <span>비밀번호 확인</span>
          <input
            {...register("passwordConfirm", {
              minLength: {
                value: 5,
                message: "비밀번호는 최소 5자리 이상으로 해주세요",
              },
            })}
            id="password_for_change_confirm"
            onFocus={() => clearErrors("extraError")}
            type="password"
          />
        </label>
        {formState?.errors?.extraError ? (
          <small>{formState?.errors?.extraError.message}</small>
        ) : null}
        <label htmlFor="submit_to_chage_password">
          <span>변경하기</span>
          <input id="submit_to_chage_password" type="submit" />
        </label>
      </Wrapper>
      {isLoading ? <LoadingOverlay isLoading={isLoading} /> : null}
    </>
  );
}

export default PasswordChageForm;
