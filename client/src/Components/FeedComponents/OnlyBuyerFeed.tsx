import { useState } from "react";
import styled from "styled-components";
import { AiOutlineMenu, AiOutlinePicture } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { GiCrownCoin } from "react-icons/gi";
import { RiVideoFill } from "react-icons/ri";
import { FaCopy } from "react-icons/fa";
import { BsDoorClosed } from "react-icons/bs";
import { MdOutlineReportProblem } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
// Feed Part
const FeedContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  box-shadow: ${(props) => props.theme.boxShadow};
  margin: 1vw 0;
  border-radius: 10px;
`;
const FeedImageContainer = styled.div<VisibleProps>`
  width: 100%;
  height: 40vw;
  margin-top: 1vw;
  text-align: center;
  object-fit: contain;
  position: relative;
  img {
    width: auto;
    height: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
    visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
  }
  #premium_notice_box {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* visibility: ${(props) => (props.isVisible ? "hidden" : "visible")}; */
    opacity: ${(props) => (props.isVisible ? 0 : 1)};
    svg {
      color: rgba(255, 255, 255, 0.3);
      font-size: 15vw;
    }
    & > span {
      color: rgba(255, 255, 255, 0.6);
      font-size: 1.3vw;
      margin-bottom: 3vw;
    }
    #only_buyer_notice {
      font-size: 1.5vw;
    }
    #content_payment_value_info_box {
      width: 50%;
      height: 20%;
      position: absolute;
      bottom: 0;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      #content_payment_value_info {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.3vw;
        color: white;
        text-shadow: ${(props) => props.theme.textShadow};
        svg {
          font-size: 1.8vw;
          color: ${(props) => props.theme.accentColor};
          margin-right: 0.5vw;
        }
      }
      #content_quantity_info {
        display: flex;
        margin-top: 0.5vw;

        span {
          font-size: 1.3vw;
          display: flex;
          align-items: center;
          color: white;
          text-shadow: ${(props) => props.theme.textShadow};
          svg {
            font-size: 1.6vw;
            margin-right: 0.5vw;
            color: white;
          }
        }
        span:nth-child(1) {
          margin-right: 1vw;
        }
      }
    }
  }
  #premium_notice_box:hover {
    cursor: pointer;
  }
`;
interface VisibleProps {
  isVisible: boolean;
}
const FeedMetaBox = styled.div`
  width: 100%;
  height: 8vh;
  display: flex;
  margin-bottom: 1vw;
  align-items: center;
  padding: 0 2vw;
  #feed_user_info_box {
    display: flex;
    width: 50%;
    height: 100%;
    align-items: center;
    margin-top: 2vw;
  }
  #participation_func_box {
    margin-top: 2vw;
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row-reverse; // row reverse니깐 하트, 댓글달기, 기타 기능은 역순으로 정렬
    align-items: center;
    svg {
      font-size: 2vw;
      color: white;
      margin-right: 1vw;
    }
    #participation_menu {
      margin-right: 0;
    }
    #participation_menu:hover {
      cursor: pointer;
    }
  }
  #feed_profile_img_box {
    width: 3vw;
    height: 3vw;
    border-radius: 100%;
    object-fit: contain;
    margin-right: 1vw;

    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
    }
  }
  #feed_profile_img_box:hover {
    cursor: pointer;
  }
  #feed_profile_user_info {
    width: 20%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;

    #feed_user_name {
      color: white;
      font-size: 1.1vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    #feed_user_name:hover {
      cursor: pointer;
    }
    #feed_user_id {
      font-size: 1vw;
      cursor: pointer;
    }
    #feed_user_id {
      color: rgba(255, 255, 255, 0.8);
      font-size: 1vw;
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
function OnlyBuyerFeed() {
  const [isMouseDown, setIsMouseDown] = useState(false);
  // Menu Click Control
  const [clickMenu, setClickMenu] = useState(false);
  const handleMouseDown = () => {
    setIsMouseDown(true);
  };
  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <>
      <FeedContainer>
        <FeedMetaBox>
          <div id="feed_user_info_box">
            <div id="feed_profile_img_box">
              <img
                src="https://img.gqkorea.co.kr/gq/2022/07/style_62da366deba2b.jpg"
                alt=""
              />
            </div>
            <div id="feed_profile_user_info">
              <span id="feed_user_name">김채워니</span>
              <span id="feed_user_id">@kcwon__</span>
            </div>
          </div>
          <div onClick={() => setClickMenu(true)} id="participation_func_box">
            <AiOutlineMenu id="participation_menu" />
          </div>
        </FeedMetaBox>
        <FeedImageContainer isVisible={isMouseDown}>
          <img
            src="https://blog.kakaocdn.net/dn/bJIpg4/btrWqH4vJcZ/GHWnXId18DypiQ4frdIHIk/img.png"
            alt=""
          />
          <div
            id="premium_notice_box"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
          >
            <span>
              배경을 클릭시 크리에이터가 지정한 사진을 모자이크로 볼 수 있습니다
            </span>
            <BiLock />
            <span id="only_buyer_notice">
              결제 후 컨텐츠를 확인할 수 있습니다
            </span>
            <div id="content_payment_value_info_box">
              <span id="content_payment_value_info">
                <GiCrownCoin />
                777
              </span>
              <div id="content_quantity_info">
                <span>
                  <AiOutlinePicture />3
                </span>
                <span>
                  <RiVideoFill />4
                </span>
              </div>
            </div>
          </div>
        </FeedImageContainer>
      </FeedContainer>
      <AnimatePresence>
        {clickMenu ? (
          <Overlay
            variants={overlay}
            initial="start"
            animate="end"
            exit="exit"
            onClick={() => setClickMenu(false)}
          >
            <OverlayBox
              variants={overlayBox}
              initial="start"
              animate="end"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
            >
              <div>
                <FaCopy />
                <span>게시글 링크 복사하기</span>
              </div>
              <div>
                <MdOutlineReportProblem />
                <span>신고하기</span>
              </div>
              <div onClick={() => setClickMenu(false)}>
                <BsDoorClosed />
                <span>닫기</span>
              </div>
            </OverlayBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default OnlyBuyerFeed;
