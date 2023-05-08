import styled from "styled-components";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  max-height: 100vh;
  overflow: scroll;
  margin-left: 1vw;
`;
const Table = styled.table`
  width: 100%;
  height: auto;
  th,
  td,
  tr {
    padding: 0.5vw 0;
    color: white;
    text-align: center;
    vertical-align: middle;
  }
  th {
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.1);
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
  }
  td {
    background-color: rgba(255, 255, 255, 0.1);
    font-size: 1.1vw;
    color: rgba(255, 255, 255, 0.9);
  }
  tr:last-child {
    border-bottom: 1px solid ${(props) => props.theme.accentColor};
  }
`;
function BillingHistory() {
  return (
    <SettingSubList>
      <Table>
        <th>결제일시</th>
        <th>결제내용</th>
        <th>결제금액</th>
        <th>결제방식</th>
        <tr>
          <td>2023-04-19 14:17:34</td>
          <td>아랑씨의 상품 - 아랑의의 일기장 1개월 정기구독</td>
          <td>27,300</td>
          <td>카드</td>
        </tr>
        <tr>
          <td>2023-04-19 14:17:34</td>
          <td>아랑씨의 상품 - 아랑의의 일기장 1개월 정기구독</td>
          <td>27,300</td>
          <td>카드</td>
        </tr>
        <tr>
          <td>2023-04-19 14:17:34</td>
          <td>아랑씨의 상품 - 아랑의의 일기장 1개월 정기구독</td>
          <td>27,300</td>
          <td>카드</td>
        </tr>
        <tr>
          <td>2023-04-19 14:17:34</td>
          <td>아랑씨의 상품 - 아랑의의 일기장 1개월 정기구독</td>
          <td>27,300</td>
          <td>카드</td>
        </tr>
      </Table>
    </SettingSubList>
  );
}

export default BillingHistory;
