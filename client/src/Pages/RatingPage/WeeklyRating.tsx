import styled from "styled-components";
import TopRank from "../../Components/TopRank";
import LowerRatingCard from "../../Components/LowerRatingCard";
const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  background-color: black;
  display: flex;
  flex-direction: column;
  padding: 0vw 5vw;
`;

function WeeklyRating() {
  return (
    <Wrapper>
      <TopRank />
      <LowerRatingCard />
    </Wrapper>
  );
}

export default WeeklyRating;
