import { useSetRecoilState } from "recoil";
import { userFeedLayout } from "../../../atoms/atoms";
import styled from "styled-components";
import RequestionForCreator from "../../../Components/FeedComponents/RequestionForCreator";
import RequestionForUser from "../../../Components/FeedComponents/RequestionForUser";
import RequestionForUserSecreat from "../../../Components/FeedComponents/RequestionForUserSecreat";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1vw;
`;
const ApplyBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1vw;
  button {
    background-color: black;
    color: white;
    border: 1px solid white;
    padding: 1vw 4vw;
    font-size: 1.3vw;
    font-weight: 600;
    box-shadow: ${(props) => props.theme.textShadow};
    text-shadow: ${(props) => props.theme.textShadow};
    border-radius: 10px;
    transition: 0.1s ease-in-out;
  }
  button:hover {
    cursor: pointer;
    color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
  }
`;
function UserRequestion() {
  const setOverlay = useSetRecoilState(userFeedLayout);
  return (
    <Wrapper>
      <ApplyBox>
        <button onClick={() => setOverlay("request")}>리퀘스트 신청하기</button>
      </ApplyBox>
      <RequestionForCreator></RequestionForCreator>
      <RequestionForUser></RequestionForUser>
      <RequestionForUserSecreat></RequestionForUserSecreat>
    </Wrapper>
  );
}

export default UserRequestion;
