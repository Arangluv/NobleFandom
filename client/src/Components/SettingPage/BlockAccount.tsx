import styled from "styled-components";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  padding-left: 3vw;
  margin-left: 1vw;
  max-height: 100vh;
  overflow: scroll;
  h2 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    margin-top: 1vw;
  }
`;
const Table = styled.table`
  width: 100%;
  height: auto;
  margin-top: 2vw;
  border-collapse: collapse;
  th,
  tr,
  td {
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
  #unblock {
    span {
      text-shadow: ${(props) => props.theme.textRedShadow};
      transition: all 0.1s ease-in-out;
    }
    span:hover {
      color: ${(props) => props.theme.textRedColor};
      cursor: pointer;
    }
  }
`;

function BlockAccount() {
  return (
    <SettingSubList>
      <h2>차단한 계정</h2>
      <Table>
        <th>아이디</th>
        <th>닉네임</th>
        <th>차단 해제</th>
        <tr>
          <td>user_id</td>
          <td>user_nickname</td>
          <td id="unblock">
            <span>해제하기</span>
          </td>
        </tr>
        <tr>
          <td>user_id</td>
          <td>user_nickname</td>
          <td id="unblock">
            <span>해제하기</span>
          </td>
        </tr>
      </Table>
    </SettingSubList>
  );
}

export default BlockAccount;
