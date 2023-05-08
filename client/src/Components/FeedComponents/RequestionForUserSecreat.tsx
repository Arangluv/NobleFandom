import styled from "styled-components";
import { AiFillLock } from "react-icons/ai";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  margin-bottom: 1.5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  svg {
    font-size: 3vw;
    color: rgba(255, 255, 255, 0.4);
    margin-bottom: 0.5vw;
  }
  span {
    font-size: 1.2vw;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.4);
  }
`;
function RequestionForUserSecreat() {
  return (
    <Wrapper>
      <AiFillLock />
      <span>본인이 신청한 리퀘스트만 볼 수 있습니다</span>
    </Wrapper>
  );
}

export default RequestionForUserSecreat;
