import { motion } from "framer-motion";
import styled from "styled-components";
import SilderMain from "../Components/SliderMain";
import UserIntroSubPage from "./MainSubPage/UserIntroSubPage";
import InfluenceIntroPage from "./MainSubPage/InfluenceIntroPage";
import { Link } from "react-router-dom";
import JoinWithMe from "./MainSubPage/JoinWithMe";
interface IProps {
  bgColor?: string;
}
const SubWrapper = styled.div<IProps>`
  width: 100%;
  height: 100vh;
  background-color: ${(props) => props.bgColor};
  &.subContainer_1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 150vh;
  }
  &.subContainer_2 {
    height: 150vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    h2 {
      margin-top: 15vh;
      font-size: 4vw;
      font-weight: 700;
    }
  }
  &.subContainer_3 {
    height: 300vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    & > div:nth-child(1) {
      text-align: center;
    }
    h2 {
      margin-top: 15vh;
      font-size: 4vw;
      font-weight: 700;
      color: ${(props) => props.theme.bgColor};
    }
    h3 {
      font-size: 2.5vw;
      color: ${(props) => props.theme.accentColor};
    }
  }
  &.subContainer_4 {
    height: 400vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    & > div:nth-child(1) {
      text-align: center;
    }
    h2 {
      /* margin-top: 5vh; */
      font-size: 4vw;
      font-weight: 700;
      color: ${(props) => props.theme.bgColor};
    }
    h3 {
      font-size: 2.5vw;
      color: ${(props) => props.theme.accentColor};
    }
  }
  &.subContainer_5 {
    height: 100vh;
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
  }
  &.subContainer_6 {
    height: 30vh;
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
`;
const DailyHot = styled(motion.div)`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 10vw;
  margin-bottom: 6vw;
  width: 100%;
  height: 50vh;
  h2 {
    font-size: 1.5vw;
    color: ${(props) => props.theme.bgColor};
    text-shadow: ${(props) => props.theme.textShadow};
    font-weight: 600;
    position: absolute;
    top: -3.5vw;
  }
`;
const WeeklyHot = styled(DailyHot)`
  margin-top: 3vw;
  margin-bottom: 0px;
`;
const ContentContainer = styled.div`
  width: 100%;
  height: 100vh;
  margin-top: 10vh;
  position: relative;
  display: flex;
  div {
    width: 40%;
    height: 50%;
    border-radius: 5px;
    position: relative;
  }
  div.content_1 {
    top: 2vw;
    left: 2vw;
    background-color: red;
  }
  div.content_2 {
    top: 25vw;
    border: 1px solid blue;
    background-color: blue;
    z-index: 1;
  }
  div.content_3 {
    top: 2vw;
    left: -2vw;
    background-color: red;
  }
  div.content_4 {
    top: 25vw;
    left: -4vw;
    background-color: blue;
    z-index: 1;
  }
`;
const UserIntroduceBox = styled(motion.div)`
  margin-top: 10vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;
const CompanyInfo = styled.div`
  display: flex;
  margin-left: 2vw;
  flex-direction: column;
  justify-content: center;
  font-size: 1vw;
  padding-left: 1vw;
  span {
    color: #95a5a6;
  }
`;
const SitePolicy = styled.div`
  margin-top: 1vw;
  a {
    color: #95a5a6;
    font-size: 1.2vw;
    margin-right: 1vw;
  }
`;
const daliyVarients = {
  start: {
    y: 30,
    opacity: 0,
  },
  end: {
    y: 0,
    opacity: 1,
    transition: {
      delay: 0.5,
      duration: 1,
    },
  },
};
const weeklyVarients = {
  start: {
    y: 30,
    opacity: 0,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 1,
      duration: 1,
    },
  },
};
const elVarients = {
  start: {
    y: 20,
    opacity: 0,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      // delay: 0.5,
      duration: 1,
    },
  },
};
function MainIndex() {
  return (
    <>
      <SubWrapper bgColor="black" className="subContainer_1">
        <DailyHot variants={daliyVarients} initial="start" animate="end">
          <h2>일간 인기 크리에이터</h2>
          <SilderMain />
        </DailyHot>
        <WeeklyHot variants={weeklyVarients} initial="start" animate="end">
          <h2>주간 인기 크리에이터</h2>
          <SilderMain />
        </WeeklyHot>
      </SubWrapper>
      <SubWrapper bgColor="white" className="subContainer_2">
        <motion.h2
          variants={elVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          수익 창출은 쉽고 간편해야합니다
        </motion.h2>
        <ContentContainer>
          <motion.div
            variants={elVarients}
            whileInView="end"
            initial="start"
            viewport={{ once: true }}
            className="content_1"
          ></motion.div>
          <motion.div
            variants={elVarients}
            whileInView="end"
            initial="start"
            viewport={{ once: true }}
            className="content_2"
          ></motion.div>
          <motion.div
            variants={elVarients}
            whileInView="end"
            initial="start"
            viewport={{ once: true }}
            className="content_3"
          ></motion.div>
          <motion.div
            variants={elVarients}
            whileInView="end"
            initial="start"
            viewport={{ once: true }}
            className="content_4"
          ></motion.div>
        </ContentContainer>
      </SubWrapper>
      <SubWrapper bgColor="black" className="subContainer_3">
        <motion.div
          variants={elVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          <h2>사용자도 다양한 경험을 할 수 있어요</h2>
          <h3>구독 만족 경험을 최대로</h3>
        </motion.div>
        <UserIntroduceBox>
          <UserIntroSubPage />
        </UserIntroduceBox>
      </SubWrapper>
      <SubWrapper bgColor="black" className="subContainer_4">
        <motion.div
          variants={elVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          <h2>나의 팬들과 소통하기</h2>
          <h3>노블팬덤을 통해 다양한 서비스를 제공할 수 있어요</h3>
        </motion.div>
        <InfluenceIntroPage />
      </SubWrapper>
      <SubWrapper bgColor="black" className="subContainer_5">
        <JoinWithMe />
      </SubWrapper>
      <SubWrapper bgColor="white" className="subContainer_6">
        <CompanyInfo>
          <span>BIGDO Co.</span>
          <span>535-6 Bongmyeong-dong (33244)</span>
          <span>&copy; 2023 BIGDO All Rights Reserved.</span>
        </CompanyInfo>
        <SitePolicy>
          <Link to="/">서비스이용약관</Link>
          <Link to="/">개인정보취급정책</Link>
          <Link to="/">운영정책</Link>
        </SitePolicy>
      </SubWrapper>
    </>
  );
}

export default MainIndex;
