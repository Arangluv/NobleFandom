import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { GiCrownCoin } from "react-icons/gi";
import RefundHistoryItem from "./RefundHistoryItem";
import { useEffect, useState } from "react";
import RefundForm from "./Component/RefundForm";
import AccountRegister from "./Component/AccountRegister";
import AccountModify from "./Component/AccountModify";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 1vw;
  padding-left: 3vw;
`;
const HaveCoinBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  h2 {
    color: white;
    font-weight: 600;
    border-bottom: 1px solid white;
    padding-bottom: 0.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  div {
    display: flex;
    margin-top: 1vw;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 2vw;
    & > span {
      color: white;
      display: flex;
      align-items: center;
      text-shadow: ${(props) => props.theme.textShadow};
      font-weight: 600;
      font-size: 1.5vw;
      svg {
        color: ${(props) => props.theme.accentColor};
        font-size: 2.5vw;
        margin-right: 0.5vw;
      }
    }
    button {
      padding: 1vw 4vw;
      border: 1px solid ${(props) => props.theme.accentColor};
      border-radius: 10px;
      color: ${(props) => props.theme.accentColor};
      text-shadow: ${(props) => props.theme.textShadow};
      font-weight: 600;
      background-color: black;
      box-shadow: ${(props) => props.theme.textShadow};
      transition: 0.1s ease-in-out;
    }
    button:hover {
      cursor: pointer;
      background-color: ${(props) => props.theme.accentColor};
      color: white;
    }
  }
`;
const RegisterRefundAccount = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding-bottom: 2vw;
  margin-top: 4vw;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  h2 {
    color: white;
    font-weight: 600;
    border-bottom: 1px solid white;
    padding-bottom: 0.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  #register_ok {
    width: 100%;
    height: auto;
    margin-top: 1vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    div {
      span:nth-child(1) {
        margin-right: 1vw;
        text-shadow: ${(props) => props.theme.textShadow};
        transition: 0.1s ease-in-out;
      }
      span:nth-child(1):hover {
        cursor: pointer;
        color: ${(props) => props.theme.accentColor};
      }
      span:nth-child(2) {
        color: #3498db;
        text-shadow: none;
        font-weight: 600;
      }
    }
  }
  #register_requier {
    width: 100%;
    height: auto;
    margin-top: 1vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    div {
      span:nth-child(1) {
        margin-right: 1vw;
        text-shadow: ${(props) => props.theme.textShadow};
        transition: 0.1s ease-in-out;
      }
      span:nth-child(1):hover {
        cursor: pointer;
        color: ${(props) => props.theme.accentColor};
      }
      span:nth-child(2) {
        color: ${(props) => props.theme.accentColor};
        text-shadow: none;
        font-weight: 600;
      }
    }
  }
`;
const RefundHistory = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 4vw;
  h2 {
    color: white;
    font-weight: 600;
    border-bottom: 1px solid white;
    padding-bottom: 0.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  div {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    padding: 1vw 0;
  }
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OverlayBox = styled(motion.div)`
  width: 40vw;
  height: auto;
  /* height: 50vw; */
  overflow-y: scroll;
  padding: 2vw 1vw;
  background-color: black;
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.textShadow};
  border-radius: 10px;
`;
const overlay = {
  start: {
    backgroundColor: "rgba(255, 255, 255 ,0)",
  },
  end: {
    backgroundColor: "rgba(255, 255, 255 ,0.2)",
  },
  exit: {
    backgroundColor: "rgba(255, 255, 255 ,0)",
  },
};
const overlayBox = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};
function Refund() {
  const [isClick, setIsClick] = useState(false);
  const [boxState, setBoxState] = useState<
    null | "register" | "refund" | "modify"
  >(null);
  const [currentOverlay, setCurrentOverlay] = useState<null | JSX.Element>(
    null
  );
  useEffect(() => {
    if (boxState === null) {
      return;
    }

    if (boxState === "register") {
      setCurrentOverlay(<AccountRegister />);
    } else if (boxState === "refund") {
      setCurrentOverlay(<RefundForm />);
    } else {
      setCurrentOverlay(<AccountModify />);
    }
  }, [boxState]);
  return (
    <>
      <SettingSubList>
        <HaveCoinBox>
          <h2>보유중인 크라운코인</h2>
          <div>
            <span>
              <GiCrownCoin />
              <span>2,600</span>
            </span>
            <button onClick={() => setBoxState("refund")}>정산 신청</button>
          </div>
        </HaveCoinBox>
        <RegisterRefundAccount>
          <h2>정산 계좌 정보</h2>
          <div>
            {/* <div id="register_ok">
              <span>계좌등록 상태 : </span>
              <div>
                <span onClick={() => setBoxState("modify")}>정보 보기</span>
                <span>OK!</span>
              </div>
            </div> */}
            <div id="register_requier">
              <span>계좌등록 상태 : </span>
              <div>
                <span onClick={() => setBoxState("register")}>등록하기</span>
                <span>등록필요</span>
              </div>
            </div>
          </div>
        </RegisterRefundAccount>
        <RefundHistory>
          <h2>정산 내역</h2>
          <div>
            <RefundHistoryItem />
            <RefundHistoryItem />
            <RefundHistoryItem />
            <RefundHistoryItem />
          </div>
        </RefundHistory>
      </SettingSubList>
      <AnimatePresence>
        {boxState ? (
          <Overlay
            onClick={() => setBoxState(null)}
            variants={overlay}
            initial="start"
            animate="end"
            exit="exit"
          >
            <OverlayBox
              variants={overlayBox}
              initial="start"
              animate="end"
              exit="exit"
            >
              {currentOverlay}
            </OverlayBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Refund;
