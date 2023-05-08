import styled from "styled-components";
import ChatAllMain from "../../../Components/Chat/ChatAllMain";
import { FaCheck } from "react-icons/fa";
import { useState } from "react";
const Wrapper = styled.div`
  width: 80%;
  display: flex;
  min-height: 100vh;
  height: auto;
  background-color: black;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-top: 1.5vw;
  padding-bottom: 1.5vw;
  border-left: 1px solid white;
  margin-left: 2vw;
`;
const ChatList = styled.div`
  box-sizing: border-box;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
`;
const ChattingBox = styled.div<IProps>`
  min-height: 12vw;
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  h2 {
    color: white;
    font-size: 1.3vw;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-bottom: 1vw;
    padding-bottom: 1vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  }
  & > div {
    width: 100%;
    text-align: center;
    border: 1px solid white;
    border-radius: 15px;
    padding: 0.5vw 0;
    margin-bottom: 1vw;
    transition: all 0.1s ease-in-out;
    box-shadow: ${(props) => props.theme.textShadow};
    span {
      color: white;
      transition: all 0.1s ease-in-out;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    svg {
      margin-left: 0.5vw;
      color: white;
      transition: all 0.1s ease-in-out;
    }
  }
  & > div:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
    span {
      color: ${(props) => props.theme.accentColor};
    }
    svg {
      color: ${(props) => props.theme.accentColor};
    }
  }
  #select_accent {
    border-color: ${(props) => props.theme.accentColor};
    span {
      color: ${(props) => props.theme.accentColor};
    }
    svg {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
interface IProps {
  target: string | null;
}
function ChatAll() {
  const [target, setTarget] = useState<
    null | "all" | "subscriber" | "follower" | "vip"
  >(null);
  return (
    <Wrapper>
      <ChatAllMain />
      <ChatList>
        <ChattingBox target={target}>
          <h2>메세지 대상 설정</h2>
          <div
            onClick={() => setTarget("all")}
            id={target === "all" ? "select_accent" : ""}
          >
            <span>팔로우 + 구독자</span>
            <FaCheck />
          </div>
          <div
            onClick={() => setTarget("subscriber")}
            id={target === "subscriber" ? "select_accent" : ""}
          >
            <span>구독자만</span>
            <FaCheck />
          </div>
          <div
            onClick={() => setTarget("follower")}
            id={target === "follower" ? "select_accent" : ""}
          >
            <span>팔로우만</span>
            <FaCheck />
          </div>
          <div
            onClick={() => setTarget("vip")}
            id={target === "vip" ? "select_accent" : ""}
          >
            <span>VIP 구독자만</span>
            <FaCheck />
          </div>
        </ChattingBox>
      </ChatList>
    </Wrapper>
  );
}

export default ChatAll;
