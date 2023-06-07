import styled from "styled-components";
import { RiMailSendLine } from "react-icons/ri";
import { SlPresent } from "react-icons/sl";
const ChatSubmitForm = styled.form`
  width: 100%;
  height: 5vw;
  padding: 0 1vw;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0.5vw;
  input[type="text"] {
    width: 90%;
    height: 3vw;
    border: 1px solid white;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    box-shadow: ${(props) => props.theme.textShadow};
    padding: 0.8vw 0.8vw;
    background-color: black;
    color: white;
  }
  input[type="text"]:focus {
    outline: none;
  }
  input[type="text"]::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
  label[for="sell_to_one"] {
    width: 10%;
    height: 3vw;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    display: flex;
    justify-content: center;
    align-items: center;
    input[id="sell_to_one"] {
      display: none;
    }
    svg {
      color: ${(props) => props.theme.accentColor};
      width: 2vw;
      height: 2vw;
    }
  }
  label[for="sell_to_one"]:hover {
    cursor: pointer;
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
  label[for="submit_chat"]:hover {
    cursor: pointer;
  }
`;
interface IProps {
  setCurrentMenu: React.Dispatch<
    React.SetStateAction<"menu" | "media" | "premium" | null>
  >;
}
function ChatSubmitCreator({ setCurrentMenu }: IProps) {
  return (
    <ChatSubmitForm>
      <input type="text" placeholder="메세지를 입력하세요" />
      <label onClick={() => setCurrentMenu("premium")} htmlFor="sell_to_one">
        <SlPresent />
      </label>
      <label htmlFor="submit_chat">
        <RiMailSendLine />
        <input id="submit_chat" type="submit" value="보내기" />
      </label>
    </ChatSubmitForm>
  );
}

export default ChatSubmitCreator;
