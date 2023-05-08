import styled from "styled-components";
import TopRank from "../../Components/TopRank";
import LowerRatingCard from "../../Components/LowerRatingCard";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  padding: 0vw 5vw;
  background-color: black;
`;

function TotalRating() {
  return (
    <Wrapper>
      <TopRank />
      <LowerRatingCard />
    </Wrapper>
  );
}

export default TotalRating;
