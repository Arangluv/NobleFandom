import { useQuery } from "@tanstack/react-query";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyles";
import { theme } from "./styles/theme";
import Routers from "./Routers";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { userTokenInspect } from "./api/user/usesApi";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { loginState } from "./atoms/atoms";
interface LoginProps {
  backGroundImg: null | string;
  profileImg: null | string;
  userId: string;
  userType: string;
  username: string;
}
function App() {
  const { isLoading, data } = useQuery<LoginProps>(["usertoken"], {
    queryFn: userTokenInspect,
  });
  const [userLogin, setUserLogin] = useRecoilState(loginState);
  console.log(userLogin);
  useEffect(() => {
    const newState = {
      userId: data?.userId,
      username: data?.username,
      userType: data?.userType,
      backGroundImg: data?.backGroundImg,
      profileImg: data?.profileImg,
    };
    setUserLogin(newState);
  }, [isLoading]);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routers />
      <ReactQueryDevtools initialIsOpen={false} />
    </ThemeProvider>
  );
}

export default App;
