import styled from "styled-components";
import { GiCrownCoin } from "react-icons/gi";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  box-shadow: ${(props) => props.theme.boxShadow};
  margin-bottom: 1vw;
  border-radius: 10px;
  display: flex;
  &#refund_history_container {
    flex-direction: row;
  }
`;
const RefundContent = styled.div`
  &#refund_content {
    width: 80%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 1vw;
    span:nth-child(1) {
      font-size: 1vw;
      margin-bottom: 0.5vw;
      color: rgba(255, 255, 255, 0.6);
    }
    span:nth-child(2) {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
`;
const RefundCoinValue = styled.div`
  &#refund_coin_value {
    width: 20%;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding-right: 1vw;
    align-items: center;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    svg {
      color: ${(props) => props.theme.accentColor};
      margin-right: 0.5vw;
      font-size: 2vw;
    }
  }
`;
function RefundHistoryItem() {
  return (
    <Wrapper id="refund_history_container">
      <RefundContent id="refund_content">
        <span>2023-04-24 14:25:23</span>
        <span>정산 요청 접수 | 230,423원 입금 예정</span>
      </RefundContent>
      <RefundCoinValue id="refund_coin_value">
        <GiCrownCoin />
        <span>-2,300</span>
      </RefundCoinValue>
    </Wrapper>
  );
}

export default RefundHistoryItem;
