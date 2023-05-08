import styled from "styled-components";
import { BiWon } from "react-icons/bi";
const Wrapper = styled.div`
  width: 100%;
  height: 50vw;
  overflow-y: scroll;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
`;
const HistoryBox = styled.div`
  width: 100%;
  height: 5vw;
  margin-bottom: 0.5vw;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  div:first-child {
    width: 80%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1vw;
    & > small {
      color: rgba(0, 0, 0, 0.3);
      font-size: 1vw;
    }
    #refund_content {
      justify-content: flex-start;
      align-items: flex-start;
      text-shadow: 0 0 1px black;
      font-size: 1.2vw;
    }
  }
  div:last-child {
    width: 20%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

{
  /* <HistoryBox>
  <div>
    <small>2023-04-25 19:23:23</small>
    <span id="refund_content">4월 정기 구독료 정산 완료</span>
  </div>
  <div>
    <BiWon />
    <span>230,000</span>
  </div>
</HistoryBox>; */
}
function IncomeRefundHistory() {
  return (
    <Wrapper>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((item) => (
        <HistoryBox key={item}>
          <div>
            <small>2023-04-25 19:23:23</small>
            <span id="refund_content">4월 정기 구독료 정산 완료</span>
          </div>
          <div>
            <BiWon />
            <span>230,000</span>
          </div>
        </HistoryBox>
      ))}
    </Wrapper>
  );
}

export default IncomeRefundHistory;
