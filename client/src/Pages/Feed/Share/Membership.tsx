import styled from "styled-components";
import SearchCard from "../../../Components/SearchCard";
import { RiVipDiamondLine } from "react-icons/ri";
const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  border-left: 1px solid white;
  margin-left: 2vw;
  padding-left: 2vw;
  padding-right: 200px;
  padding-top: 1.5vw;
  padding-bottom: 2vw;
`;
const SubWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1vw;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1vw;

  h1 {
    color: white;
    font-size: 1.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  svg {
    color: white;
    font-size: 1.5vw;
    margin-right: 0.3vw;
  }
`;
function Membership() {
  return (
    <Wrapper>
      <Title>
        <RiVipDiamondLine />
        <h1>구독중인 크리에이터</h1>
      </Title>
      <SubWrapper>
        <SearchCard></SearchCard>
        <SearchCard></SearchCard>
        <SearchCard></SearchCard>
        <SearchCard></SearchCard>
        <SearchCard></SearchCard>
        <SearchCard></SearchCard>
        <SearchCard></SearchCard>
        <SearchCard></SearchCard>
        <SearchCard></SearchCard>
      </SubWrapper>
    </Wrapper>
  );
}

export default Membership;
