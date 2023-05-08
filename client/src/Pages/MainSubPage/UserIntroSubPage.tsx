import styled from "styled-components";
import { motion } from "framer-motion";

interface IIntorProps {
  isLeft?: boolean;
}

const UserIntroduceSubBox = styled.div<IIntorProps>`
  display: flex;
  justify-content: space-between;
  width: 90%;
  article {
    margin-right: ${(props) => (props.isLeft ? "2vw" : 0)};
    margin-left: ${(props) => (props.isLeft ? 0 : "2vw")};
    color: ${(props) => props.theme.bgColor};
    h4 {
      font-size: 3vw;
      font-weight: 700;
      margin-bottom: 1vw;
    }
    p {
      font-size: 1.5vw;
      font-weight: 600;
    }
  }
  &.user_intro_sub_1 > div {
    margin-left: 2vw;
  }
  &.user_intro_sub_1 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 2vw;
  }

  &.user_intro_sub_2 > div {
    margin-right: 2vw;
  }
  &.user_intro_sub_2 {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10vw;
  }

  &.user_intro_sub_3 {
    margin-top: 10vw;
  }

  &.user_intro_sub_3 > div {
    border: 1px solid red;
    border-radius: 5px;
    height: 30vw;
    width: 45%;
    display: flex;
    justify-content: center;
    position: relative;
    h4 {
      color: ${(props) => props.theme.bgColor};
      position: absolute;
      font-size: 2vw;
      top: -4vw;
      font-weight: 600;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
`;

const userIntroLeftVarients = {
  start: { x: -100, opacity: 0 },
  end: { x: 0, opacity: 1, transition: { duration: 1 } },
};
const userIntroRightVarients = {
  start: { x: 100, opacity: 0 },
  end: { x: 0, opacity: 1, transition: { duration: 1 } },
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
function UserIntroSubPage() {
  return (
    <>
      <UserIntroduceSubBox className="user_intro_sub_1" isLeft={true}>
        <motion.article
          variants={userIntroLeftVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          <h4>블라블라</h4>
          <p>
            대한민국은 민주공화국이다. 국채를 모집하거나 예산외에 국가의 부담이
            될 계약을 체결하려 할 때에는 정부는 미리 국회의 의결을 얻어야 한다.
            국가는 청원에 대하여 심사할 의무를 진다. 국회나 그 위원회의 요구가
            있을 때에는 국무총리·국무위원 또는 정부위원은 출석·답변하여야 하며,
            국무총리 또는 국무위원이 출석요구를 받은 때에는 국무위원 또는
            정부위원으로 하여금 출석·답변하게 할 수 있다.
          </p>
        </motion.article>
        <motion.div
          variants={userIntroRightVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          <img
            src="https://cdn.huffingtonpost.kr/news/photo/202009/100644_187850.jpeg"
            alt=""
          />
        </motion.div>
      </UserIntroduceSubBox>
      <UserIntroduceSubBox className="user_intro_sub_2" isLeft={false}>
        <motion.div
          variants={userIntroLeftVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          <img
            src="https://cdn.huffingtonpost.kr/news/photo/202009/100644_187850.jpeg"
            alt=""
          />
        </motion.div>
        <motion.article
          variants={userIntroRightVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          <h4>블라블라</h4>
          <p>
            대한민국은 민주공화국이다. 국채를 모집하거나 예산외에 국가의 부담이
            될 계약을 체결하려 할 때에는 정부는 미리 국회의 의결을 얻어야 한다.
            국가는 청원에 대하여 심사할 의무를 진다. 국회나 그 위원회의 요구가
            있을 때에는 국무총리·국무위원 또는 정부위원은 출석·답변하여야 하며,
            국무총리 또는 국무위원이 출석요구를 받은 때에는 국무위원 또는
            정부위원으로 하여금 출석·답변하게 할 수 있다.
          </p>
        </motion.article>
      </UserIntroduceSubBox>
      <UserIntroduceSubBox className="user_intro_sub_3">
        <motion.div
          variants={elVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          <h4>내 취향 인플루언서를 쉽게 찾을 수 있어요</h4>
        </motion.div>
        <motion.div
          variants={elVarients}
          whileInView="end"
          initial="start"
          viewport={{ once: true }}
        >
          <h4>능동적인 컨텐츠 참여</h4>
        </motion.div>
      </UserIntroduceSubBox>
    </>
  );
}

export default UserIntroSubPage;
