import { AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { motion } from "framer-motion";
import RatingCard from "./RatingCard";
import { FiArrowRightCircle, FiArrowLeftCircle } from "react-icons/fi";
import { useEffect, useState } from "react";
import SearchCard from "./SearchCard";

const Container = styled(motion.div)`
  width: 100%;
  justify-content: space-between;
  align-items: center;
  display: flex;
  position: relative;
  & > svg {
    color: ${(props) => props.theme.bgColor};
    text-shadow: ${(props) => props.theme.textShadow};
    z-index: 999;
    font-size: 2vw;
    font-weight: 500;
  }
`;
const Slider = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1vw;
  align-items: center;
  position: absolute;
`;
const containerVarients = {
  start: (isNext: boolean) => ({
    x: isNext ? window.outerWidth + 10 : -(window.outerWidth + 10),
    // opacity: 0,
  }),
  end: {
    x: 0,
    // opacity: 1,
  },
  exit: (isNext: boolean) => ({
    x: isNext ? -(window.outerWidth + 10) : window.outerWidth + 10,
    // opacity: 0,
  }),
};
function SilderMain() {
  const [isNext, setIsNext] = useState(false);
  const [visibleNum, setVisibleNum] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setVisibleNum((pre) => pre + 1);
      setIsNext(true);
    }, 10000);
  }, [visibleNum]);
  return (
    <Container>
      <AnimatePresence initial={false} custom={isNext}>
        <FiArrowLeftCircle />
        <Slider
          variants={containerVarients}
          custom={isNext}
          initial="start"
          animate="end"
          exit="exit"
          key={visibleNum}
          transition={{ type: "tween", duration: 1 }}
        >
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
          <SearchCard />
        </Slider>
        <FiArrowRightCircle />
      </AnimatePresence>
    </Container>
  );
}

export default SilderMain;
