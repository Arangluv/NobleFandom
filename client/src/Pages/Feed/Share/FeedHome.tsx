import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import Feed from "../../../Components/Feed";
import { useEffect, useState } from "react";

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
  position: relative;
  padding-top: 20vw;
`;
const Notification = styled(motion.div)`
  width: 100%;
  height: 20vw;
  position: absolute;
  top: 0vw;
  img {
    object-fit: fill;
    width: 100%;
    height: 100%;
  }
`;
const noticeVar = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
function FeedHome() {
  const imgMock = [
    "https://www.whosbag.com/design/whosbag/smartpc/main_img/notice-board-banner.jpg",
    "https://previews.123rf.com/images/gmast3r/gmast3r1604/gmast3r160400011/54757914-%EC%82%B0-%EB%B2%94%EC%9C%84-%EC%97%AC%EB%A6%84-%EA%B0%80%EB%A1%9C-%EA%B0%80%EB%A1%9C-%EB%B0%B0%EB%84%88-%EB%B2%A1%ED%84%B0-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8-%EB%A0%88%EC%9D%B4-%EC%85%98.jpg",
    "https://i.pinimg.com/originals/3d/04/83/3d0483a943e61b82fb4740601bbebd8c.jpg",
  ];
  const [count, setCount] = useState(0);
  useEffect(() => {
    setTimeout(() => {
      setCount((pre) => pre + 1);
    }, 5000);
  }, [count]);
  return (
    <Wrapper>
      <SubWrapper>
        <AnimatePresence initial={false}>
          <Notification
            key={count}
            variants={noticeVar}
            initial="start"
            animate="end"
            exit="exit"
          >
            <img src={imgMock[count]} alt="" />
          </Notification>
        </AnimatePresence>
        <Feed />
      </SubWrapper>
    </Wrapper>
  );
}

export default FeedHome;
