import styled from "styled-components";

const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 1vw;
  padding-left: 3vw;
`;
const FanStatus = styled.div`
  width: 100%;
  height: auto;
  h2 {
    color: white;
    font-weight: 600;
    text-shadow: ${(props) => props.theme.textShadow};
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
  }
  & > div {
    padding-top: 1vw;
    display: flex;
    flex-direction: column;
    span {
      font-size: 1.3vw;
      text-shadow: ${(props) => props.theme.textShadow};
      color: white;
      margin-bottom: 1vw;
      span {
        color: ${(props) => props.theme.accentColor};
        font-weight: 600;
      }
    }
    border-bottom: 1px solid white;
    padding-bottom: 1vw;
  }
`;
const FanListBox = styled.div`
  width: 100%;
  min-height: 50vw;
  max-height: 50vw;
  overflow-y: scroll;
  display: flex;
  padding-top: 1vw;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(241, 196, 15, 0.8);
    visibility: hidden;
    border-radius: 10px;
    transition: 0.2s ease-in-out;
  }
  &::-webkit-scrollbar {
    background-color: black;
    width: 10px;
    visibility: hidden;
    transition: 0.2s ease-in-out;
  }
  &:hover {
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }
  & > div {
    height: 50vw;
  }
  & > div:nth-child(1) {
    border-right: 1px solid rgba(255, 255, 255, 0.5);
    width: 40%;
    h2 {
      font-weight: 600;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 1vw;
    }

    table {
      width: 100%;
      height: auto;
      max-height: 40vw;
      border-collapse: collapse;
      overflow: scroll;
      th,
      tr,
      td {
        border-bottom: 1px solid white;
        color: white;
        text-align: center;
        padding: 1vw 0;
        font-size: 1.1vw;
        transition: 0.1s ease-in-out;
      }
      th {
        text-shadow: ${(props) => props.theme.textShadow};
        font-size: 1.3vw;
        font-weight: 600;
        color: ${(props) => props.theme.accentColor};
      }
      td:nth-child(1):hover {
        cursor: pointer;
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
  & > div:nth-child(2) {
    width: 60%;
    h2 {
      margin-left: 1vw;
      font-weight: 600;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 1vw;
    }
    table {
      width: 100%;
      height: auto;
      max-height: 40vw;
      border-collapse: collapse;
      overflow: scroll;
      th,
      tr,
      td {
        border-bottom: 1px solid white;
        color: white;
        text-align: center;
        padding: 1vw 0;
        font-size: 1.1vw;
        transition: 0.1s ease-in-out;
      }
      th {
        text-shadow: ${(props) => props.theme.textShadow};
        font-size: 1.3vw;
        font-weight: 600;
        color: ${(props) => props.theme.accentColor};
      }
      td:nth-child(1):hover {
        cursor: pointer;
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;
function MyFandom() {
  return (
    <SettingSubList>
      <FanStatus>
        <h2>구독 상황</h2>
        <div>
          <span>
            A 플랜 구독자 : <span>5명</span>{" "}
          </span>
          <span>
            B 플랜 구독자 : <span>12명</span>
          </span>
          <span>
            C 플랜 구독자 : <span>32명</span>
          </span>
        </div>
      </FanStatus>
      <FanListBox>
        <div>
          <h2>구독자</h2>
          <table>
            <th>닉네임</th>
            <th>구독플랜</th>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>A</td>
            </tr>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>A</td>
            </tr>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>A</td>
            </tr>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>A</td>
            </tr>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>A</td>
            </tr>
          </table>
        </div>
        <div>
          <h2>팬 랭킹</h2>
          <table>
            <th>닉네임</th>
            <th>사용코인</th>
            <th>구독플랜</th>

            <tr>
              <td>빛나는 아랑씨</td>
              <td>2,300</td>
              <td>A</td>
            </tr>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>2,300</td>
              <td>A</td>
            </tr>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>2,300</td>
              <td>A</td>
            </tr>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>2,300</td>
              <td>A</td>
            </tr>
            <tr>
              <td>빛나는 아랑씨</td>
              <td>2,300</td>
              <td>A</td>
            </tr>
          </table>
        </div>
      </FanListBox>
    </SettingSubList>
  );
}

export default MyFandom;
