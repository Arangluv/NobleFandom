import { atom } from "recoil";

export const userFeedLayout = atom<
  null | "subscribe" | "feed" | "request" | "response"
>({
  key: "useFeedLayout",
  default: null,
});
