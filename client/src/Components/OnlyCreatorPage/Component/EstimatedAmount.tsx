import styled from "styled-components";
import { BiWon } from "react-icons/bi";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  overflow-y: scroll;
  margin-top: 15vw;
  display: flex;
  flex-direction: column;

  table {
    width: 100%;
    th,
    tr,
    td {
      font-size: 1.2vw;
      text-shadow: 0px 0px 1px rgba(0, 0, 0, 0.5);
    }
    th {
      small {
        margin-left: 0.3vw;
      }
    }
    td {
      text-align: center;
    }
    #total_fandom_quatity {
      td {
        padding-bottom: 1vw;
      }
    }
    #total_fandom_price {
      border-top: 1px solid black;
      border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      td {
        padding: 1vw 0;
        color: red;
      }
    }
    #total_refund_value {
      td {
        color: ${(props) => props.theme.accentColor};
        padding-top: 1vw;
      }
    }
  }
`;
function EstimatedAmount() {
  return (
    <Wrapper>
      <table>
        <th>
          A플랜
          <small>30,000₩</small>
        </th>
        <th>
          B플랜
          <small>20,000₩</small>
        </th>
        <th>
          C플랜
          <small>10,000₩</small>
        </th>
        <tr id="total_fandom_quatity">
          <td>3명</td>
          <td>2명</td>
          <td>7명</td>
        </tr>
        <tr id="total_fandom_price">
          <td>90,000₩</td>
          <td>40,000₩</td>
          <td>70,000₩</td>
        </tr>
        <tr id="total_refund_value">
          <td>총 정산금액</td>
          <td></td>
          <td>200,000₩</td>
        </tr>
      </table>
    </Wrapper>
  );
}

export default EstimatedAmount;
