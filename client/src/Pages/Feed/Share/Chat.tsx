import styled from "styled-components";
import Chatting from "../../../Components/Chatting";
import ChatableList from "../../../Components/ChatableList";
import ChatMain from "../../../Components/ChatMain";
import { Link } from "react-router-dom";

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
  border: 1px solid white;
  border-radius: 10px;
  box-sizing: border-box;
  box-shadow: ${(props) => props.theme.textShadow};
  padding: 1vw;
  display: flex;
  flex-direction: column;
  width: 30%;
  height: 100%;
  a {
    color: ${(props) => props.theme.accentColor};
    text-align: center;
    border: 1px solid ${(props) => props.theme.accentColor};
    font-weight: 600;
    padding: 0.5vw 0;
    border-radius: 10px;
    margin-top: 1vw;
    transition: all 0.1s ease-in-out;
  }
  a:hover {
    box-shadow: ${(props) => props.theme.textShadow};
    text-shadow: ${(props) => props.theme.textShadow};
  }
`;
const ChattingBox = styled.div`
  min-height: 12vw;
  height: auto;
  width: 100%;
  max-height: 27vw;
  overflow-y: scroll;
  overflow-x: hidden;
  transition: 0.2s ease-in-out;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(241, 196, 15, 0.8);
    visibility: hidden;
    border-radius: 10px;
    transition: 0.2s ease-in-out;
  }
  &::-webkit-scrollbar {
    background-color: black;
    width: 10px;
    visibility: hidden;
    transition: 0.2s ease-in-out;
  }
  &:hover {
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }
  h2 {
    color: white;
    font-size: 1.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-bottom: 0.5vw;
  }
`;
const ChatListBox = styled.div`
  min-height: 12vw;
  height: auto;
  margin-bottom: 0;
  border-top: 1px solid white;
  width: 100%;
  max-height: 35vw;
  overflow-y: scroll;
  overflow-x: hidden;
  h2 {
    margin-top: 0.5vw;
    color: white;
    font-size: 1.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-bottom: 0.5vw;
  }
`;
function Chat() {
  return (
    <Wrapper>
      <ChatMain />
      <ChatList>
        <ChattingBox>
          <h2>메세지</h2>
          <Chatting />
          <Chatting />
        </ChattingBox>
        {/* <ChatListBox>
          <h2>추천하는 크리에이터</h2>
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
        </ChatListBox> */}
        <ChatListBox>
          <h2>구독자 리스트</h2>
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
          <ChatableList />
        </ChatListBox>
        <Link to="/main/chat-all">전체 메세지 보내기</Link>
      </ChatList>
    </Wrapper>
  );
}

export default Chat;
