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
`;
const SearchFiller = styled.div`
  width: 80%;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8vw;
  margin-bottom: 2vw;
  button {
    background-color: black;
    border: 1px solid white;
    color: white;
    box-shadow: ${(props) => props.theme.textShadow};
    padding: 1vw;
    border-radius: 10px;
    margin-right: 0.5vw;
  }
  label {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    display: flex;
    width: 400px;
    input[id="search_influ"] {
      background-color: black;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      width: 90%;
      padding: 1vw;
    }
    input[id="search_influ"]::placeholder {
      color: rgba(255, 255, 255, 0.8);
    }
    input[type="submit"] {
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      background-color: black;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      color: white;
      border-left: none;
    }
  }
`;
const GridBox = styled.div`
  display: grid;
  height: auto;
  grid-gap: 2vw;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 2vw;
`;
function SearchInfluence() {
  return (
    <Wrapper>
      <SearchFiller>
        <div>
          <button>여자인플루언서</button>
          <button>남자인플루언서</button>
          <button>일러스트레이터</button>
        </div>
        <div>
          <label htmlFor="search_influ">
            <input
              id="search_influ"
              type="text"
              placeholder="인플루언서 찾기"
            />
            <input type="submit" />
          </label>
        </div>
      </SearchFiller>
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

export default SearchInfluence;
