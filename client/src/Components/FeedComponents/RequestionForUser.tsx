import styled from "styled-components";
import { GiCrownCoin } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";
import { useSetRecoilState } from "recoil";
import { userFeedLayout } from "../../atoms/atoms";
const Wrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 10vw;
  margin-bottom: 1.5vw;
  display: flex;
  align-items: center;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  position: relative;
  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.accentColor};
  }
`;
const RequestionProfile = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  div {
    width: 4vw;
    height: 4vw;
    border-radius: 100%;
    margin-bottom: 0.5vw;
    img {
      object-fit: cover;
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  span {
    color: white;
    font-size: 1vw;
    text-shadow: ${(props) => props.theme.textShadow};
  }
`;
const RequestionContent = styled.div`
  width: 80%;
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1vw 2vw;
  div {
    padding: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    height: auto;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.2);
    p {
      color: white;
      font-size: 1.1vw;
      white-space: pre-wrap;
    }
  }
  span {
    color: white;
    margin-left: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    text-shadow: ${(props) => props.theme.textShadow};
    svg {
      color: ${(props) => props.theme.accentColor};
      font-size: 1.5vw;
      margin-right: 0.5vw;
    }
  }
`;
const Menubox = styled.div`
  position: absolute;

  right: 0.5vw;
  top: 0.5vw;
  svg {
    font-size: 2vw;
    color: ${(props) => props.theme.textRedColor};
  }
  svg:hover {
    cursor: pointer;
  }
`;
function RequestionForUser() {
  const setOverlay = useSetRecoilState(userFeedLayout);
  return (
    <Wrapper onClick={() => setOverlay("response")}>
      <Menubox>
        <TiDeleteOutline />
      </Menubox>
      <RequestionProfile>
        <div>
          <img
            src="https://cdn.newsculture.press/news/photo/202207/509775_619054_128.jpg"
            alt=""
          />
        </div>
        <span>user_name</span>
      </RequestionProfile>
      <RequestionContent>
        <div>
          <p>
            리퀘스트 내용이 들어갑니다!리퀘스트 내용이 들어갑니다!리퀘스트
            내용이 들어갑니다! 리퀘스트 내용이 들어갑니다! 리퀘스트 내용이
            들어갑니다! 리퀘스트 내용이 들어갑니다!리퀘스트 내용이
          </p>
        </div>
        <span>
          <GiCrownCoin /> 755
        </span>
      </RequestionContent>
    </Wrapper>
  );
}

export default RequestionForUser;
