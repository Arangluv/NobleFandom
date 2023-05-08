import styled from "styled-components";
import SearchCard from "../../Components/SearchCard";

const Wrapper = styled.div`
  width: 100%;
  height: auto;
  background-color: black;
  min-height: 100vh;
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;

const SubWrapper = styled.div`
  width: 80%;
  height: auto;
  min-height: 50vh;
  margin-top: 10vw;
`;

const GridBox = styled.div`
  display: grid;
  height: auto;
  grid-gap: 1vw;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 2vw;
`;

function CardPost() {
  return (
    <Wrapper>
      <SubWrapper>
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
        <GridBox>
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
        </GridBox>
      </SubWrapper>
    </Wrapper>
  );
}

export default CardPost;
