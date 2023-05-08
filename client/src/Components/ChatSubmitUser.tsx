import styled from "styled-components";
import { RiMailSendLine } from "react-icons/ri";
import { BsCardImage } from "react-icons/bs";
const ChatSubmitForm = styled.form`
  width: 100%;
  height: 5vw;
  padding: 0 1vw;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  input[type="text"] {
    width: 90%;
    height: 3vw;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    padding: 0.8vw 0.8vw;
    background-color: black;
    color: white;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }
  input[type="text"]:focus {
    outline: none;
  }
  input[type="text"]::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  label[for="submit_chat"] {
    width: 10%;
    height: 3vw;
    padding: 0.8vw 0.5vw;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      color: white;
      width: 2.5vw;
      height: 2.5vw;
    }
    input[type="submit"] {
      display: none;
    }
  }
`;

function ChatSubmitUser() {
  return (
    <ChatSubmitForm>
      <input type="text" placeholder="무료 메세지 5회" />
      <label htmlFor="submit_chat">
        <RiMailSendLine />
        <input id="submit_chat" type="submit" value="보내기" />
      </label>
    </ChatSubmitForm>
  );
}

export default ChatSubmitUser;
