import styled from "styled-components";
import CardTypeForFan from "./CardTypeForFan";
import CardTypeOnlyBuy from "./CardTypeOnlyBuy";
import CardTypeFree from "./CardTypeFree";

const Wrapper = styled.div`
  margin-top: 1vw;
  height: auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1vw;
  #card_cantainer {
    width: 100%;
    height: 30vw;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.textShadowThin};
  }
  #card_container:hover {
    border-color: ${(props) => props.theme.accentColor};
  }
`;
function CardTypeFeed() {
  return (
    <Wrapper>
      <CardTypeForFan />
      <CardTypeOnlyBuy />
      <CardTypeFree />
      <CardTypeForFan />
      <CardTypeOnlyBuy />
      <CardTypeFree />
      <CardTypeForFan />
      <CardTypeOnlyBuy />
      <CardTypeFree />
      <CardTypeForFan />
      <CardTypeOnlyBuy />
      <CardTypeFree />
    </Wrapper>
  );
}

export default CardTypeFeed;
