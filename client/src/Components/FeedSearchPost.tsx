import styled from "styled-components";
import SearchCard from "./SearchCard";

const SearchContentBox = styled.div`
  width: 100%;
  min-height: 100vh;
  height: auto;
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
`;

const GridBox = styled.div`
  display: grid;
  height: auto;
  grid-gap: 1vw;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 2vw;
`;
function FeedSearchPost() {
  return (
    <SearchContentBox>
      <GridBox>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </GridBox>
      <GridBox>
        <SearchCard />
        <SearchCard />
        <SearchCard />
        <SearchCard />
      </GridBox>
    </SearchContentBox>
  );
}

export default FeedSearchPost;
