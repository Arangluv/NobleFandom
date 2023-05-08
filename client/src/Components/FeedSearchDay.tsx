import styled from "styled-components";
import TopRank from "./TopRank";
import LowerRatingCard from "./LowerRatingCard";

const SearchContentBox = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
`;

function FeedSearchDay() {
  return (
    <SearchContentBox>
      <TopRank />
      <LowerRatingCard />
    </SearchContentBox>
  );
}

export default FeedSearchDay;
