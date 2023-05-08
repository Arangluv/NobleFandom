import styled from "styled-components";
import Feed from "../../../Components/Feed";
const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  background-color: black;
  padding-left: 2vw;
  padding-right: 200px;
  padding-top: 1.5vw;
  border-left: 1px solid white;
  margin-left: 2vw;
`;
const SubWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;
function LikedFeed() {
  return (
    <Wrapper>
      <SubWrapper>
        <Feed />
        <Feed />
        <Feed />
      </SubWrapper>
    </Wrapper>
  );
}

export default LikedFeed;
