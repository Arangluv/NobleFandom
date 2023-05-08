import { Link } from "react-router-dom";
import styled from "styled-components";
import { BsArrowRightCircle } from "react-icons/bs";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    color: white;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    text-shadow: ${(props) => props.theme.textShadow};
    display: block;
    width: 60%;
    padding: 2vw 0;
    border-radius: 20px;
    transition: all 0.1s ease-in-out;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2vw;
    font-weight: 600;
    svg {
      margin-left: 0.5vw;
      width: 2vw;
      height: 2vw;
    }
  }
  a:hover {
    color: ${(props) => props.theme.accentColor};
    border-color: ${(props) => props.theme.accentColor};
  }
`;

function CreatorApply() {
  // Register-creator로 이동시킬때 state를 이용해 이메일 정보를 전송해야한다.
  return (
    <SettingSubList>
      <Link to="/register-creator">
        크리에이터 신청페이지로 <BsArrowRightCircle />
      </Link>
    </SettingSubList>
  );
}

export default CreatorApply;
