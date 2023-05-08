import { useEffect, useState } from "react";
import styled from "styled-components";
import UserComment from "../UserComment";
import {
  AiOutlineHeart,
  AiOutlineMenu,
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from "react-icons/ai";
import { FaRegComment, FaCopy } from "react-icons/fa";
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
const FeedImageContainer = styled.div`
  width: 100%;
  height: 40vw;
  text-align: center;
  margin-top: 0.4vw;
  position: relative;
  img {
    object-fit: cover;
    width: auto;
    height: 100%;
    border-top-right-radius: 10px;
    border-top-left-radius: 10px;
  }
  #controller_box {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1vw;
    svg {
      color: rgba(255, 255, 255, 0.8);
      font-size: 2.5vw;
      transition: 0.1s ease-in-out;
    }
    svg:hover {
      cursor: pointer;
      color: ${(props) => props.theme.accentColor};
    }
  }
`;
const FeedWritingBox = styled.div`
  width: 100%;
  min-height: 20vh;
  height: auto;
  padding: 1vw 2vw;

  #feed_writing {
    position: relative;
    width: 100%;
    max-height: auto;
    height: auto;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    box-sizing: border-box;
    p {
      padding: 1.5vw 2vw;
      white-space: pre-wrap;
      color: white;
      font-size: 1.1vw;
    }
  }
  #more_see_box {
    width: 100%;
    display: flex;
    align-items: center;
    position: absolute;
    bottom: -1.6vw;
    hr {
      width: 45%;
      border: none;
      height: 1px;
      border-top: 1px solid rgba(255, 255, 255, 0.5);
    }
    span {
      color: rgba(255, 255, 255, 0.5);
      font-size: 1.2vw;
    }
  }
  #more_see_box:hover {
    cursor: pointer;
  }
`;
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
const FeedInteractiveBox = styled.div`
  width: 100%;
  min-height: 10vh;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: black;
  padding: 1vw 2vw;
  #interactive {
    width: 100%;
    height: auto;
    display: flex;
    svg {
      width: 2.5vw;
      height: 2.5vw;
      color: white;
      margin-right: 1vw;
    }
    svg:hover {
      cursor: pointer;
    }
    #clicked_heart {
      color: ${(props) => props.theme.textRedColor};
    }
  }
  #show_heart_value {
    color: white;
    margin-top: 1vw;
  }
  #show_all_comment {
    color: rgba(255, 255, 255, 0.5);
    margin-bottom: 0.3vw;
    font-size: 1.2vw;
    span:hover {
      cursor: pointer;
    }
  }
  #add_comment {
    padding: 0 1vw;
    height: 2.5vw;
    margin-top: 0.5vw;
    display: flex;
    align-items: center;
    input[type="text"] {
      width: 90%;
      height: 100%;
      padding: 1vw;
      background-color: black;
      border-top-left-radius: 10px;
      border-bottom-left-radius: 10px;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      color: white;
    }
    input[type="text"]:focus {
      outline: none;
    }
    input[type="submit"] {
      width: 10%;
      height: 100%;
      color: white;
      background-color: black;
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
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
// TODO:: DELETE THIS, AND ADD SERVER DATA
const testWrite = `사면·감형 및 복권에 관한 사항은 법률로 정한다. 정부는 회계연도마다 예산안을 편성하여 회계연도 개시 90일전까지 국회에 제출하고, 국회는 회계연도 개시 30일전까지 이를 의결하여야 한다.

선거와 국민투표의 공정한 관리 및 정당에 관한 사무를 처리하기 위하여 선거관리위원회를 둔다. 대통령의 임기연장 또는 중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는 효력이 없다.

국가는 평생교육을 진흥하여야 한다. 대통령은 국무회의의 의장이 되고, 국무총리는 부의장이 된다. 신체장애자 및 질병·노령 기타의 사유로 생활능력이 없는 국민은 법률이 정하는 바에 의하여 국가의 보호를 받는다.`;
interface IProps {
  imgSrc: string;
  comment: string;
}
const userCommentData: IProps[] = [
  {
    imgSrc:
      "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    comment: `헌법재판소에서 법률의 위헌결정, 탄핵의 결정, 정당해산의 결정 또는
            헌법소원에 관한 인용결정을 할 때에는 재판관 6인 이상의 찬성이 있어야
            한다. 모든 국민은 직업선택의 자유를 가진다. 대법원은 법률에 저촉되지
            아니하는 범위안에서 소송에 관한 절차, 법원의 내부규율과 사무처리에
            관한 규칙을 제정할 수 있다. 모든 국민은 그 보호하는 자녀에게 적어도
            초등교육과 법률이 정하는 교육을 받게 할 의무를 진다.`,
  },
  {
    imgSrc:
      "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    comment: `헌법재판`,
  },
  {
    imgSrc:
      "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    comment: `헌법재판소에서 법률의 위헌결정, `,
  },
  {
    imgSrc:
      "https://image.ytn.co.kr/general/jpg/2022/1118/202211181457199274_d.jpg",
    comment: `헌법재판`,
  },
];
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
function PremiumFeed() {
  // Feed Writing Box Overflow Handling
  const [shortWrite, setShortWrite] = useState("");
  const [writeOverFlow, setWriteOverflow] = useState(false);
  const [moreSee, setMoreSee] = useState(false); // More See click handle State
  const [heartClicked, setHeartClicked] = useState(false);
  const [visibleComment, setVisibleComment] = useState(false); // 코멘트가 2개이상일때 true
  // Menu Click Control
  const [clickMenu, setClickMenu] = useState(false);
  // user more see commnet and, apply comment handling
  const [seeMoreComment, setSeeMoreComment] = useState(false);

  // 유저 댓글 수의 overflow를 핸들링하기 위해 배열 state 선언
  const [commentData, setCommentData] = useState<IProps[]>([]);

  // More See Handling
  const moreSeeClick = () => {
    setMoreSee((pre) => !pre);
  };
  // Feed Writing Part Overflow Inspect
  useEffect(() => {
    // 피드에서 내용에 해당하는 부분의 overflow를 설정
    if (testWrite.length > 100) {
      setShortWrite(testWrite.slice(0, 100) + "...");
      setWriteOverflow(true);
    } else {
      setShortWrite(testWrite);
    }
    // 피드에서 댓글에 해당하는 부분의 overflow를 설정
    if (userCommentData.length > 1) {
      setVisibleComment(true);
      setCommentData([userCommentData[0]]);
    }
  }, []);
  // 유저가 댓글 더보기 혹은 댓글 달기를 눌렀을때
  useEffect(() => {
    if (seeMoreComment) {
      setCommentData([...userCommentData]);
    }
  }, [seeMoreComment]);
  // Heart Handling
  const clickHeart = () => {
    setHeartClicked((pre) => !pre);
  };
  const clickApplyComment = () => {
    setSeeMoreComment(true);
  };
  const clickMoreComment = () => {
    setSeeMoreComment((pre) => !pre);
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
        <FeedWritingBox>
          <div id="feed_writing">
            <p>{moreSee ? testWrite : shortWrite}</p>
            {writeOverFlow ? (
              <div onClick={moreSeeClick} id="more_see_box">
                <hr />
                <span>{moreSee ? "숨기기" : "더보기"}</span>
                <hr />
              </div>
            ) : null}
          </div>
        </FeedWritingBox>
        <FeedImageContainer>
          <img
            src="https://blog.kakaocdn.net/dn/bJIpg4/btrWqH4vJcZ/GHWnXId18DypiQ4frdIHIk/img.png"
            alt=""
          />
          <div id="controller_box">
            <AiOutlineArrowLeft />
            <AiOutlineArrowRight />
          </div>
        </FeedImageContainer>
        <FeedInteractiveBox>
          <div id="interactive">
            {heartClicked ? (
              <AiFillHeart onClick={clickHeart} id="clicked_heart" />
            ) : (
              <AiOutlineHeart onClick={clickHeart} />
            )}
            <FaRegComment onClick={clickApplyComment} />
          </div>
          <div id="show_heart_value">
            <span>좋아요</span> <span>203개</span>
          </div>
          {visibleComment ? (
            <div id="show_all_comment">
              <span onClick={clickMoreComment}>
                {seeMoreComment ? "댓글 접기" : "댓글 모두보기"}
              </span>
            </div>
          ) : null}
          {commentData.length > 0 ? (
            !seeMoreComment ? (
              <UserComment
                imgSrc={commentData[0].imgSrc}
                comment={commentData[0].comment}
              />
            ) : (
              <>
                {commentData.map((comment, idx) => (
                  <UserComment
                    key={idx}
                    imgSrc={comment.imgSrc}
                    comment={comment.comment}
                  />
                ))}
                <form action="" id="add_comment">
                  <input type="text" placeholder="댓글달기" />
                  <input type="submit" value="게시" />
                </form>
              </>
            )
          ) : null}
        </FeedInteractiveBox>
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

export default PremiumFeed;
