import { useGoogleLogin } from "@react-oauth/google";
import { AiFillGoogleSquare } from "react-icons/ai";
import { useForm, UseFormSetError } from "react-hook-form";
import axios from "axios";
import uuid from "react-uuid";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../atoms/atoms";
import { useNavigate } from "react-router-dom";
interface DataProps {
  email: string;
  password: string;
  extraError?: string;
}
interface IProps {
  setError: UseFormSetError<DataProps>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
interface LoginProps {
  backGroundImg: null | string | undefined;
  profileImg: null | string | undefined;
  userId: string | undefined;
  userType: string | undefined;
  username: string | undefined;
}
function GoogleLoginBnt({ setError, setIsLoading }: IProps) {
  const setLoginState = useSetRecoilState(loginState);
  const navigator = useNavigate();
  const loginButtonOnClick = useGoogleLogin({
    onSuccess: async (response) => {
      setIsLoading(true);
      axios
        .post(
          "http://localhost:4000/google-login",
          {
            access_token: response.access_token,
            userId: uuid().split("-")[0],
            username: uuid().split("-")[4],
          },
          { withCredentials: true }
        )
        .then((result) => {
          const { data } = result;
          setLoginState({
            ...data,
          });
          setIsLoading(false);
          navigator("/", { replace: true });
        })
        .catch((error) => {
          setIsLoading(false);
          setError("extraError", {
            message: error?.response.data.message,
          });
        });
    },
    onError: (error) => {
      setIsLoading(false);
      setError("extraError", {
        message: "로그인하는데 문제가 발생했습니다. 잠시후 다시 이용해주세요",
      });
    },
  });

  return (
    <button onClick={() => loginButtonOnClick()}>
      <AiFillGoogleSquare />
      <span>구글 로그인</span>
    </button>
  );
}

export default GoogleLoginBnt;
