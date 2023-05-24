import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Routers from "./Routers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { userTokenInspect } from "./api/user/usesApi";
import { ToastContainer, toast } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { loginState } from "./atoms/atoms";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
interface LoginProps {
  backGroundImg: null | string | undefined;
  profileImg: null | string | undefined;
  userId: string | undefined;
  userType: string | undefined;
  username: string | undefined;
}
function App() {
  const { isLoading, data: userState } = useQuery<LoginProps | undefined>({
    queryKey: ["usertoken"],
    queryFn: userTokenInspect,
    staleTime: 1000 * 10,
    cacheTime: Infinity,
    retry: false,
    // meta: {
    //   message: "토큰을 받아오는데 실패했습니다",
    // },
  });
  const setUserLogin = useSetRecoilState(loginState);
  useEffect(() => {
    if (userState) {
      setUserLogin({ ...userState });
    }
  }, [isLoading]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routers />
      <ToastContainer
        position="bottom-center"
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeOnClick
        autoClose={3000}
      />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
