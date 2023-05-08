import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 1vw;
  padding-left: 3vw;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  h2 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    font-weight: 600;
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
    margin-bottom: 1vw;
  }
`;
const SelectReciveBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 3vw;
  h2 {
    font-size: 1.2vw;
    color: ${(props) => props.theme.accentColor};
    text-shadow: ${(props) => props.theme.textShadow};
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
  }
  #recive_setting_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 4vw;
    span {
      color: white;
      font-size: 1.1vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    div {
      width: 4vw;
      height: 2vw;
      display: flex;
      align-items: center;
      padding: 0.2vw;
      border-radius: 15px;
      background-color: rgba(255, 255, 255, 0.3);
      div {
        width: 1.8vw;
        height: 1.8vw;
        border-radius: 50%;

        background-color: rgba(255, 255, 255, 0.4);
      }
    }
    div:hover {
      cursor: pointer;
    }
  }
`;
const PaidMsgBox = styled.div`
  width: 100%;
  height: auto;

  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  padding-top: 1vw;
  h2 {
    font-size: 1.2vw;
    color: ${(props) => props.theme.accentColor};
    text-shadow: ${(props) => props.theme.textShadow};
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
  }
  form {
    margin-top: 1vw;
    width: 100%;
    height: auto;
    label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 0.5vw;
      span {
        color: white;
        font-size: 1.1vw;
        text-shadow: ${(props) => props.theme.textShadowThin};
      }
      input[type="number"] {
        background-color: black;
        border: none;
        border-bottom: 1px solid white;
        text-align: center;
        color: white;
        padding-bottom: 0.5vw;
      }
      input[type="number"]:focus {
        outline: none;
      }
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      input::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
    }
    label:first-child {
      margin-bottom: 1vw;
    }
    .notice_setting {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1vw;
      display: block;
    }
    label[for="init_message_setting"] {
      margin-top: 1vw;
      textarea {
        width: 50%;
        background-color: black;
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadowThin};
        color: white;
        font-size: 1.1vw;
        padding: 0.5vw;
        border-radius: 10px;
        height: 10vw;
      }
      textarea:focus {
        outline: none;
      }
    }
    input[type="submit"] {
      width: 30%;
      border: 1px solid white;
      border-radius: 10px;
      background-color: black;
      color: white;
      margin-top: 2vw;
      padding: 1vw;
      transition: all 0.1s ease-in-out;
    }
    input[type="submit"]:hover {
      cursor: pointer;
      color: ${(props) => props.theme.accentColor};
      border-color: ${(props) => props.theme.accentColor};
    }
  }
`;
function MessageSetting() {
  const [reciveAll, setReciveAll] = useState(true);
  const wrapperCss = {
    justifyContent: reciveAll ? "flex-end" : "flex-start",
    backgroundColor: reciveAll
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(255,255,255,0.3)",
  };
  const subWrapperCss = {
    backgroundColor: reciveAll ? "#f9ca24" : "rgba(255,255,255,0.3)",
  };
  return (
    <SettingSubList>
      <Title>
        <h2>메세지 설정</h2>
      </Title>
      <SelectReciveBox>
        <h2>메세지 수신 설정</h2>
        <div id="recive_setting_container">
          <span>모든 유저에게 받기</span>
          <AnimatePresence>
            <motion.div
              style={{ ...wrapperCss }}
              onClick={() => setReciveAll((pre) => !pre)}
            >
              <motion.div style={{ ...subWrapperCss }} layout></motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </SelectReciveBox>
      <PaidMsgBox>
        <h2>메세지 설정</h2>
        <form action="">
          <label htmlFor="free_message_quantity">
            <span>무료 메세지 수</span>
            <input
              id="free_message_quantity"
              type="number"
              placeholder="무료 메세지 한도"
            />
          </label>
          <label htmlFor="message_per_coin">
            <span>유료 메세지 코인</span>
            <input
              id="message_per_coin"
              type="number"
              placeholder="메세지 당 코인 수"
            />
          </label>
          <span className="notice_setting">
            일반 사용자에게 받을 수 있는 무료 메세지의 수를 설정할 수 있습니다.
            (최소 1개이상)
          </span>
          <span className="notice_setting">
            유료메세지는 건당 최대 10개까지 가능합니다.
          </span>
          <label htmlFor="init_message_setting">
            <span>구독 / 팔로우 시 메세지 설정</span>
            <textarea
              id="init_message_setting"
              placeholder="메세지 내용 입력"
            />
          </label>
          <input type="submit" value="저장하기" />
        </form>
      </PaidMsgBox>
    </SettingSubList>
  );
}

export default MessageSetting;
