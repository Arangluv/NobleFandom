import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const JoinWithMeBox = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 50%;
  margin-bottom: 1.5vw;
  small {
    color: ${(props) => props.theme.bgColor};
    text-shadow: ${(props) => props.theme.textShadow};
    font-size: 1.2vw;
    margin-bottom: 1vw;
  }
  a {
    text-decoration: none;
    color: ${(props) => props.theme.bgColor};
    text-shadow: ${(props) => props.theme.textShadow};
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid ${(props) => props.theme.accentColor};
    box-shadow: ${(props) => props.theme.textShadow};
    border-radius: 5px;
    padding: 2vw 0;
    font-size: 2vw;
  }
`;

const elVarients = {
  start: {
    y: 20,
    opacity: 0,
  },
  end: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};
function JoinWithMe() {
  return (
    <>
      <motion.div
        className="start_with_me_title"
        variants={elVarients}
        whileInView="end"
        initial="start"
        viewport={{ once: true }}
      >
        <h3>지금 시작해보세요</h3>
        <h4>노블팬덤에서 당신의 컨텐츠가 빛날 수 있게</h4>
      </motion.div>
      <JoinWithMeBox
        variants={elVarients}
        whileInView="end"
        initial="start"
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
      >
        <small>기획사, 에이전시, 소속사이신가요?</small>
        <Link to="/register-partner">노블팬덤 파트너 신청하기</Link>
      </JoinWithMeBox>
      <JoinWithMeBox
        variants={elVarients}
        whileInView="end"
        initial="start"
        whileHover={{ scale: 1.01 }}
        viewport={{ once: true }}
      >
        <small>개인 크리에이터 이신가요?</small>
        <Link to="/register-creator">개인 크리에이터 신청하기</Link>
      </JoinWithMeBox>
      <JoinWithMeBox
        variants={elVarients}
        whileInView="end"
        initial="start"
        viewport={{ once: true }}
        whileHover={{ scale: 1.01 }}
      >
        <small>로그인 하기</small>
        <Link to="/login">유저 / 크리에이터 로그인</Link>
      </JoinWithMeBox>
    </>
  );
}

export default JoinWithMe;
