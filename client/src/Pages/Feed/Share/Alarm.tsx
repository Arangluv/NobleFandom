import styled from "styled-components";
import { BsAlarm } from "react-icons/bs";
import { AiFillDelete } from "react-icons/ai";
const Wrapper = styled.div`
  width: 80%;
  min-height: 100vh;
  height: auto;
  background-color: black;
  padding-left: 2vw;
  padding-right: 200px;
  padding-top: 1.5vw;
  border-left: 1px solid white;
  margin-left: 2vw;
`;
const SubWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
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
const AlarmContainer = styled.div`
  width: 100%;
  height: 15vh;
  border-radius: 10px;
  border: 1px solid white;
  margin-bottom: 1vw;
  box-shadow: ${(props) => props.theme.textShadow};
  display: flex;
`;
const ProfileImageBox = styled.div`
  width: 20%;
  height: 100%;
  display: flex;
  justify-content: center;
  border-right: 1px solid white;
  align-items: center;
  div {
    width: 5vw;
    height: 5vw;
    border-radius: 100%;
    object-fit: contain;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
`;
const AlarmContentBox = styled.div`
  width: 70%;
  height: 100%;
  /* border-right: 1px solid white; */
  padding: 1vw;
  p {
    color: white;
    font-size: 1.2vw;
    span {
      font-weight: 600;
      text-shadow: ${(props) => props.theme.textRedShadow};
    }
  }
`;
const AlarmDeleteBox = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    svg {
      color: ${(props) => props.theme.textRedColor};
    }
  }
  svg {
    transition: 0.1s ease-in-out;
    color: white;
    font-size: 2vw;
  }
`;
function Alarm() {
  return (
    <Wrapper>
      <SubWrapper>
        <Title>
          <BsAlarm />
          <h1>알림</h1>
        </Title>
        <AlarmContainer>
          <ProfileImageBox>
            <div>
              <img
                src="https://i.ytimg.com/vi/CnNJtnoSU5U/maxresdefault.jpg"
                alt=""
              />
            </div>
          </ProfileImageBox>

          <AlarmContentBox>
            <p>
              <span>@saasd님이</span> 맴버쉽 구독을 시작하였습니다.
            </p>
          </AlarmContentBox>

          <AlarmDeleteBox>
            <AiFillDelete />
          </AlarmDeleteBox>
        </AlarmContainer>
        <AlarmContainer>
          <ProfileImageBox>
            <div>
              <img
                src="https://i.ytimg.com/vi/CnNJtnoSU5U/maxresdefault.jpg"
                alt=""
              />
            </div>
          </ProfileImageBox>

          <AlarmContentBox>
            <p>
              <span>@saasd님이</span> 메세지를 보냈습니다.
            </p>
          </AlarmContentBox>

          <AlarmDeleteBox>
            <AiFillDelete />
          </AlarmDeleteBox>
        </AlarmContainer>
        <AlarmContainer>
          <ProfileImageBox>
            <div>
              <img
                src="https://i.ytimg.com/vi/CnNJtnoSU5U/maxresdefault.jpg"
                alt=""
              />
            </div>
          </ProfileImageBox>

          <AlarmContentBox>
            <p>
              <span>@saasd님이</span> 님이 "blur blur 게시물"에 좋아요를 눌렀습니다.
            </p>
          </AlarmContentBox>

          <AlarmDeleteBox>
            <AiFillDelete />
          </AlarmDeleteBox>
        </AlarmContainer>
      </SubWrapper>
    </Wrapper>
  );
}

export default Alarm;
