import { atom } from "recoil";

interface LoginProps {
  backGroundImg: null | string | undefined;
  profileImg: null | string | undefined;
  userId: string | undefined;
  userType: string | undefined;
  username: string | undefined;
  email: string | undefined;
  profileDescription: string | undefined;
  socialOnly: boolean;
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
    email: "",
    profileDescription: "",
    socialOnly: false,
  },
});
