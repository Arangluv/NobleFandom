import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
const Header = styled(motion.header)`
  position: fixed;
  width: 100%;
  height: 60px;
  top: 0;
  display: flex;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  div {
    width: 33%;
  }
  div:nth-child(1) {
    display: flex;
    align-items: center;
    padding-left: 2vw;
  }
  div:nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > .login_link {
    display: flex;
    justify-content: flex-end;
    padding-right: 2vw;
  }
  div:nth-child(1) > h1 > a {
    font-weight: 700;
    font-size: 2.5vw;
    text-shadow: ${(props) => props.theme.textShadow};
    color: ${(props) => props.theme.bgColor};
  }
  div:nth-child(2) > ul {
    display: flex;
    a {
      color: ${(props) => props.theme.bgColor};
      text-shadow: ${(props) => props.theme.textShadow};
    }
    li {
      margin: 0 0.5vw;
    }
  }
  & > .login_link > a {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    color: ${(props) => props.theme.bgColor};
    text-shadow: ${(props) => props.theme.textShadow};
  }
`;
const hdVarients = {
  start: {
    opacity: 0,
    transition: {
      type: "linear",
      duration: 0.5,
    },
  },
  end: {
    opacity: 1,
    transition: {
      type: "linear",
      duration: 0.5,
    },
  },
};
function MainHeader() {
  // 유저의 위치가 Login이면 ul을 비워준다.
  const { scrollYProgress } = useScroll({ offset: ["150vh", "155vh"] });
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]
  );
  return (
    <Header
      style={{ backgroundColor }}
      variants={hdVarients}
      initial="start"
      animate="end"
    >
      <div>
        <h1>
          <Link to="/">NOBLE FANDOM</Link>
        </h1>
      </div>
      <div>
        <ul>
          <li>
            <Link to="/rating/total">인기순위</Link>
          </li>
          <li>
            <Link to="/rating/weekly">주간인기</Link>
          </li>
          <li>
            <Link to="/rating/daily">하루인기</Link>
          </li>
          <li>
            <Link to="/rating/search">전체보기</Link>
          </li>
          <li>
            <Link to="/cardpost">실시간게시글</Link>
          </li>
        </ul>
      </div>
      <div className="login_link">
        <Link to="/withus">로그인</Link>
      </div>
    </Header>
  );
}

export default MainHeader;
