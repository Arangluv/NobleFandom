import { useGoogleLogin } from "@react-oauth/google";
import { AiFillGoogleSquare } from "react-icons/ai";
import axios from "axios";
function GoogleLoginBnt() {
  const loginButtonOnClick = useGoogleLogin({
    onSuccess: async (response) => {
      console.log("버튼을 눌러 성공적으로 response를 받는데 성공했습니다.");
      console.log(response);
      axios
        .post("http://localhost:4000/google-login", {
          access_token: response.access_token,
        })
        .then((data) => {
          console.log(data);
        });
    },
    onError: (error) => {
      console.log(error);
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
