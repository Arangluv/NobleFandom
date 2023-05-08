import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FaWonSign } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";
import IncomeRefundHistory from "./Component/IncomeRefundHistory";
import EstimatedAmount from "./Component/EstimatedAmount";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 1vw;
  padding-left: 3vw;
  display: flex;
  flex-direction: column;
`;
const IncomeStatueBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  h2 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
  }
  div {
    display: flex;
    align-items: center;
    margin-top: 0.5vw;
    padding-right: 1vw;
    position: relative;
    padding-bottom: 1vw;
    margin-bottom: 3vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    span,
    svg {
      color: white;
    }
    svg {
      margin-right: 0.5vw;
    }
    span {
      text-shadow: ${(props) => props.theme.textShadow};
    }
    #total_refund_history {
      position: absolute;
      right: 1vw;
      color: ${(props) => props.theme.accentColor};
      transition: all 0.1s ease-in-out;
    }
    #total_refund_history:hover {
      cursor: pointer;
      font-weight: 600;
    }
  }
`;
const MonthReFundStatusBox = styled(IncomeStatueBox)`
  h2 {
    padding-bottom: 0;
    border-bottom: none;
  }
  small {
    color: rgba(255, 255, 255, 0.3);
    font-size: 1vw;
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
  }
  #month_refund_history {
    position: absolute;
    right: 1vw;
    color: ${(props) => props.theme.accentColor};
    transition: all 0.1s ease-in-out;
  }
  #month_refund_history:hover {
    cursor: pointer;
    font-weight: 600;
  }
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  #overlay_box {
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1vw;
    width: 40vw;
    height: 50vw;
    max-height: 50vw;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    margin: 0;
    border-radius: 10px;
    span {
      display: flex;
      justify-content: flex-end;
      svg {
        color: ${(props) => props.theme.textRedColor};
        font-size: 2.5vw;
      }
    }
  }
`;
const overlay = {
  start: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  end: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  exit: {
    backgroundColor: "rgba(0,0,0,0)",
  },
};
const box = {
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
function Income() {
  const [isClick, setIsClick] = useState(false);
  const [showBox, setShowBox] = useState<null | "history" | "amount">(null);
  const handleHistoryClick = () => {
    setIsClick(true);
    setShowBox("history");
  };
  const handleAmountClick = () => {
    setIsClick(true);
    setShowBox("amount");
  };
  return (
    <>
      <SettingSubList>
        <IncomeStatueBox>
          <h2>총 정산금액</h2>
          <div>
            <FaWonSign /> <span>13,000,000원</span>
            <span onClick={handleHistoryClick} id="total_refund_history">
              정산내역 보기
            </span>
          </div>
        </IncomeStatueBox>
        <MonthReFundStatusBox>
          <h2>이번 달 구독정산 추정금액</h2>
          <small>정기 구독 정산금액으로 상황에 따라 변동될 수 있습니다</small>
          <div>
            <FaWonSign /> <span>230,000원</span>
            <span onClick={handleAmountClick} id="month_refund_history">
              내용보기
            </span>
          </div>
        </MonthReFundStatusBox>
      </SettingSubList>
      <AnimatePresence>
        {isClick ? (
          <Overlay
            onClick={() => setIsClick(false)}
            variants={overlay}
            initial="start"
            animate="end"
            exit="exit"
          >
            <motion.div
              variants={box}
              id="overlay_box"
              initial="start"
              animate="end"
              exit="exit"
            >
              <span>
                <TiDelete onClick={() => setIsClick(false)} />
              </span>
              {showBox === null ? null : showBox === "history" ? (
                <IncomeRefundHistory />
              ) : (
                <EstimatedAmount />
              )}
            </motion.div>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Income;
