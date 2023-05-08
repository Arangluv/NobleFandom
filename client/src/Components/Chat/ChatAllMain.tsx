import styled from "styled-components";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatSubmitCreator from "../ChatSubmitCreator";
import OverlayMenu from "../OverlayMenu";
import PremiumContent from "./PremiumContent";
import ChatRight from "../ChatRight";
const ChatContainer = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.textShadow};
  margin-right: 1vw;
  position: relative;
  padding-bottom: 4vw;
`;
const ChatTitle = styled.div`
  display: flex;
  align-items: center;
  height: 4vw;
  width: 100%;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  position: relative;
  div {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;
    div {
      width: 3vw;
      height: 3vw;
      border-radius: 100%;
      object-fit: contain;
      margin-right: 1vw;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      img {
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
  svg {
    color: white;
    position: absolute;
    right: 1vw;
    width: 2vw;
    height: 2vw;
  }
  svg:hover {
    cursor: pointer;
  }
`;
const ChatingBox = styled.div`
  width: 100%;
  height: auto;
  max-height: 100vh;
  overflow-y: scroll;
  padding: 1vw;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  &::-webkit-scrollbar-thumb {
    background-color: rgba(241, 196, 15, 0.8);
    visibility: hidden;
    border-radius: 10px;
    transition: 0.2s ease-in-out;
  }
  &::-webkit-scrollbar {
    background-color: black;
    width: 10px;
    visibility: hidden;
    transition: 0.2s ease-in-out;
  }
  &:hover {
    &::-webkit-scrollbar,
    &::-webkit-scrollbar-thumb {
      visibility: visible;
    }
  }
`;
const ChatAllNotice = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 1vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 1vw;
    color: rgba(255, 255, 255, 0.7);
    display: block;
    span {
      display: inline;
      margin-left: 0.2vw;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OverlayBox = styled(motion.div)`
  width: 40vw;
  height: auto;
  max-height: 55vw;
  overflow-y: scroll;
  background-color: black;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  box-shadow: ${(props) => props.theme.textShadow};
  display: flex;
  flex-direction: column;
  padding: 1vw;
  /* align-items: center; */
  justify-content: center;
  div {
    border-bottom: 1px solid white;
    margin-bottom: 1vw;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 0.5vw;
    transition: all 0.1s ease-in-out;
    span,
    svg {
      color: white;
    }
    svg {
      margin-right: 0.5vw;
      font-size: 1.5vw;
    }
  }
  div:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.1);
    span,
    svg {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const overlay = {
  start: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
  end: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  exit: {
    backgroundColor: "rgba(255, 255, 255, 0)",
  },
};
const overlayBox = {
  start: {
    opacity: 0,
  },
  end: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

function ChatAllMain() {
  const [currentMenu, setCurrentMenu] = useState<
    null | "premium" | "menu" | "media"
  >(null);
  const [showOverlay, setShowOverlay] = useState<null | JSX.Element>(null);
  useEffect(() => {
    if (currentMenu === null) {
      setShowOverlay(null);
      return;
    }

    if (currentMenu === "premium") {
      setShowOverlay(<PremiumContent />);
    } else {
      setShowOverlay(<OverlayMenu setCurrentMenu={setCurrentMenu} />);
    }
  }, [currentMenu]);
  return (
    <>
      <ChatContainer>
        <ChatTitle>
          <div>
            <div>
              <img
                src="https://image.ytn.co.kr/general/jpg/2023/0118/202301181308466432_d.jpg"
                alt="chat profile image"
              />
            </div>
            <span>소풍간 아랑이</span>
          </div>
        </ChatTitle>
        <ChatingBox>
          <ChatAllNotice>
            <span>구독자 및 팔로우들에게 전체메세지를 보내보세요</span>
            <span>
              해당 메세지는 단체 메세지로 보이는 것이 아닌
              <span>개인메세지</span>로 보입니다.
            </span>
          </ChatAllNotice>
          <ChatRight />
        </ChatingBox>
        <ChatSubmitCreator setCurrentMenu={setCurrentMenu} />
      </ChatContainer>
      <AnimatePresence>
        {showOverlay ? (
          <Overlay
            variants={overlay}
            initial="start"
            animate="end"
            exit="exit"
            onClick={() => setCurrentMenu(null)}
          >
            <OverlayBox
              variants={overlayBox}
              initial="start"
              animate="end"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
            >
              {showOverlay}
            </OverlayBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default ChatAllMain;
