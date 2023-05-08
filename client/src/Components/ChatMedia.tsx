import styled from "styled-components";

const Wrapper = styled.div`
  &#media_wrapper {
    width: 100%;
    height: auto;
    max-height: 40vw;
    border-bottom: none;
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom: 0;
    margin-bottom: 0;
    h2 {
      text-align: center;
      text-shadow: ${(props) => props.theme.textShadow};
      color: white;
    }
  }
  &#media_wrapper:hover {
    background-color: black;
    cursor: default;
  }
`;
const SubWrapper = styled.div`
  &#media_subwrapper {
    display: grid;
    margin-top: 1vw;
    grid-template-columns: repeat(4, 1fr);
    width: 100%;
    border-bottom: none;
    border: 1px solid white;
    padding-bottom: 0;
    div {
      width: 100%;
      height: 10vw;
      border: 1px solid blue;
      margin-bottom: 0;
    }
  }
  &#media_subwrapper:hover {
    background-color: black;
    cursor: default;
  }
`;
function ChatMedia() {
  return (
    <Wrapper id="media_wrapper">
      <h2>사진/동영상</h2>
      <SubWrapper id="media_subwrapper">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </SubWrapper>
    </Wrapper>
  );
}

export default ChatMedia;
