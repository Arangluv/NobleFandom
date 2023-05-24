import { atom } from "recoil";

interface LoginProps {
  backGroundImg: null | string | undefined;
  profileImg: null | string | undefined;
  userId: string | undefined;
  userType: string | undefined;
  username: string | undefined;
}
export const userFeedLayout = atom<
  null | "subscribe" | "feed" | "request" | "response"
>({
  key: "useFeedLayout",
  default: null,
});

export const loginState = atom<LoginProps>({
  key: "loginState",
  default: {
    backGroundImg: null,
    profileImg: null,
    userId: "",
    userType: "",
    username: "",
  },
});
