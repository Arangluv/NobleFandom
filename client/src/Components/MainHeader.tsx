import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState } from "../atoms/atoms";
import { userLogout } from "../api/user/usesApi";
import { toast } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
    align-items: center;
    padding-right: 2vw;
    span {
      font-size: 1.4vw;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      display: flex;
      margin-left: 2vw;
      align-items: center;
      transition: all 0.1s ease-in-out;
      &:hover {
        color: ${(props) => props.theme.accentColor};
        cursor: pointer;
      }
    }
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
      transition: all 0.1s ease-in-out;
      font-size: 1.4vw;
    }
    a:hover {
      color: ${(props) => props.theme.accentColor};
    }
    li {
      margin: 0 0.5vw;
    }
  }
  & > .login_link > a {
    display: flex;
    color: ${(props) => props.theme.bgColor};
    text-shadow: ${(props) => props.theme.textShadow};
    transition: all 0.1s ease-in-out;
    font-size: 1.4vw;
    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
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
  const setUserLoginState = useSetRecoilState(loginState);
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 1],
    ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]
  );
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      toast.success("로그아웃 하였습니다!");
      setUserLoginState({
        username: "",
        userId: "",
        userType: "",
        profileImg: null,
        backGroundImg: null,
        email: "",
        profileDescription: "",
        socialOnly: false,
      });
      return queryClient.clear();
      // return queryClient.invalidateQueries({
      //   queryKey: [
      //     "usertoken",
      //     "alarmPageAlarms",
      //     "nobleCoinValue",
      //     "newAlarms",
      //   ],
      // });
    },
    onError: () => {
      toast.error("로그아웃을 하는데 문제가 발생했습니다 다시 진행해주세요.");
    },
  });
  const userState = useRecoilValue(loginState);
  const handleLogout = () => {
    if (isLoading) {
      return;
    }
    mutate();
  };
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
        {userState.userType === "" ? (
          <Link to="/withus">로그인</Link>
        ) : (
          <>
            <Link to="/main">메인페이지</Link>
            <span onClick={handleLogout}>로그아웃</span>
          </>
        )}
      </div>
    </Header>
  );
}

export default MainHeader;
