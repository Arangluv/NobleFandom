import styled from "styled-components";
import JoinWithOutPartner from "../MainSubPage/JoinWithoutPartner";

const Wrapper = styled.div`
  height: 100vh;
  background-color: black;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  & .start_with_me_title {
    text-align: center;
    margin-bottom: 2vw;
  }
  h3 {
    font-size: 3vw;
    margin-top: 5vw;
    font-weight: 700;
    color: ${(props) => props.theme.bgColor};
    text-shadow: ${(props) => props.theme.textShadow};
  }
  h4 {
    font-size: 2vw;
    font-weight: 600;
    color: ${(props) => props.theme.accentColor};
  }
  & > div {
    margin-top: 1vw;
  }
`;
function WithUs() {
  return (
    <Wrapper>
      <JoinWithOutPartner />
    </Wrapper>
  );
}

export default WithUs;
