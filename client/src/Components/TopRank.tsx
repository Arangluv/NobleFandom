import styled from "styled-components";
import TopRankCard from "./TopRankCard";
const TopThreeRankWrapper = styled.div`
  width: 100%;
  height: 45vh;
  margin-top: 13vh;
  display: flex;
  justify-content: center;
  padding: 0 4vw;
`;

function TopRank() {
  return (
    <TopThreeRankWrapper>
      <TopRankCard />
      <TopRankCard />
      <TopRankCard />
    </TopThreeRankWrapper>
  );
}

export default TopRank;
