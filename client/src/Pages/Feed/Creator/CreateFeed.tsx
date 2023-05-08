import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { FiUpload } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import { GiCrownCoin } from "react-icons/gi";
const Wrapper = styled.div`
  width: 70vw;
  min-height: 20vw;
  height: auto;
  max-height: 55vw;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 3vw;
  h2 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    padding-bottom: 0.5vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.4);
    text-align: center;
  }
`;
const CreateFeedForm = styled.form`
  width: 100%;
  height: auto;
  margin-top: 0.5vw;
  display: flex;
  flex-direction: column;
  label[for="publish_feed_btn"] {
    margin-top: 1vw;
    border: 1px solid ${(props) => props.theme.accentColor};
    padding: 1vw 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
    span {
      color: ${(props) => props.theme.accentColor};
      transition: all 0.1s ease-in-out;
      font-weight: 600;
    }
    input[type="submit"] {
      display: none;
    }
  }
  label[for="publish_feed_btn"]:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.accentColor};
    span {
      color: white;
    }
  }
`;
const UploadImageContainer = styled.div`
  width: 100%;
  height: 23vw;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 2vw;
  label[for="upload_feed_image"] {
    width: 100%;
    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      span {
        font-size: 1.1vw;
        color: ${(props) => props.theme.accentColor};
        text-shadow: ${(props) => props.theme.textShadow};
      }
      svg {
        transition: all 0.1s ease-in-out;
        color: white;
        font-size: 4vw;
        background-color: rgba(241, 196, 15, 0.7);
        padding: 1vw;
        border-radius: 50%;
        margin-bottom: 0.5vw;
      }
    }
    div:hover {
      cursor: pointer;
      svg {
        background-color: ${(props) => props.theme.accentColor};
      }
    }
    input[type="file"] {
      display: none;
    }
  }
  #upload_image_container {
    margin-top: 1vw;
    height: 15vw;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow-x: scroll;
    box-sizing: border-box;
    &::-webkit-scrollbar-thumb {
      background-color: rgba(241, 196, 15, 0.8);
      visibility: hidden;
      border-radius: 10px;
      transition: 0.2s ease-in-out;
    }
    &::-webkit-scrollbar {
      background-color: black;
      height: 5px;
      visibility: hidden;
      transition: 0.2s ease-in-out;
    }
    &:hover {
      &::-webkit-scrollbar,
      &::-webkit-scrollbar-thumb {
        visibility: visible;
      }
    }
    div {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      img {
        width: 150px;
        height: 100%;
        object-fit: cover;
      }
      img:hover {
        border: 1px solid white;
        cursor: pointer;
      }
    }
  }
`;
const MainImageSelectBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(255, 255, 255, 0.4);
  margin-bottom: 2vw;
  padding-bottom: 1vw;
  h3 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  small {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1vw;
    padding-bottom: 0.5vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    span {
      color: ${(props) => props.theme.accentColor};
    }
  }
  #selectd_img_box {
    width: 30%;
    height: 20vw;
    margin-top: 0.5vw;
    border-radius: 5px;
    img {
      border-radius: 5px;
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
`;
const PublishScope = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  h3 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  small {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1vw;
    margin-bottom: 1vw;
  }
  &#publish_scope {
    label {
      width: 100%;
      margin-bottom: 1vw;
      min-height: 3vw;
      height: auto;
      border: 1px solid rgba(255, 255, 255, 0.5);
      border-radius: 10px;
      box-shadow: ${(props) => props.theme.textShadowThin};
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 2vw;
      transition: all 0.1s ease-in-out;
      input[type="radio"] {
        display: none;
      }
      span {
        color: white;
        font-weight: 600;
        text-shadow: ${(props) => props.theme.textShadow};
        transition: all 0.1s ease-in-out;
        span {
          font-size: 0.9vw;
          color: rgba(255, 255, 255, 0.7);
          text-shadow: none;
          margin-left: 1vw;
          span {
            color: ${(props) => props.theme.textRedColor};
            text-shadow: ${(props) => props.theme.textRedShadow};
            margin-left: 0;
          }
        }
      }
      svg {
        color: rgba(255, 255, 255, 0.6);
        font-size: 1.8vw;
        transition: all 0.1s ease-in-out;
      }
    }

    label:hover {
      cursor: pointer;
      border-color: ${(props) => props.theme.accentColor};
      span {
        color: ${(props) => props.theme.accentColor};
      }
      svg {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;
const PublishAll = styled(motion.div)`
  width: 100%;
  height: 10vw;
  margin-bottom: 1vw;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  padding: 1vw 0;
  span {
    padding-left: 1vw;
    font-size: 1.2vw;
    color: white;
    margin-bottom: 1vw;
    span {
      color: ${(props) => props.theme.accentColor};
      padding-left: 0;
      font-weight: 600;
    }
  }
  .publish_all_notice {
    margin-bottom: 0;
    font-size: 1.1vw;
    color: rgba(255, 255, 255, 0.8);
    padding-left: 1vw;
  }
`;
const PublishSubscriber = styled(motion.div)`
  width: 100%;
  height: 20vw;
  margin-bottom: 1vw;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  h3 {
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    padding-bottom: 0.5vw;
    margin-bottom: 1vw;
  }
  #membership_scope_container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    label {
      width: 100%;
      display: flex;
      padding: 1vw;
      align-items: center;
      justify-content: space-between;
      border-color: white;
    }
  }
  #describe_title {
    color: ${(props) => props.theme.accentColor};
    font-size: 1.2vw;
    text-shadow: ${(props) => props.theme.textShadowThin};
    margin-bottom: 0.5vw;
  }
  #describe_content {
    color: rgba(255, 255, 255, 0.8);
    font-size: 1.1vw;
  }
`;
const PublishPaid = styled(motion.div)`
  &#publish_paid_container {
    width: 100%;
    height: 20vw;
    margin-bottom: 1vw;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 10px;
    padding: 1vw;
    h3 {
      padding-bottom: 0.5vw;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      margin-bottom: 1vw;
    }
    label[for="publish_paid_price"] {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border: none;
      box-shadow: none;
      border-radius: 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.5);
      padding-left: 0;
      span {
        display: flex;
        align-items: center;
        color: white;
      }
      svg {
        margin-left: 2vw;
        margin-right: 0.5vw;
        color: ${(props) => props.theme.accentColor};
      }
      input[type="number"] {
        background-color: inherit;
        border: none;
        border-bottom: 1px solid white;
        text-align: center;
        padding: 0.5vw 0;
        color: white;
      }
      small {
        font-size: 1vw;
        color: ${(props) => props.theme.textRedColor};
        margin-bottom: 0;
        margin-left: 1vw;
      }
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      input[type="number"]:focus {
        outline: none;
      }
    }
    label:hover {
      border-color: rgba(255, 255, 255, 0.5);
      span {
        color: white;
      }
    }
  }
`;
const publishVariant = {
  start: {
    height: 0,
    opacity: 0,
  },
  end: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};
const FeedContent = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  small {
    color: rgba(255, 255, 255, 0.6);
    font-size: 1vw;
    margin-bottom: 1vw;
  }
  textarea {
    background-color: black;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    border-radius: 10px;
    height: 10vw;
    color: white;
    padding: 0.5vw;
  }
  textarea:focus {
    outline: none;
  }
`;
function CreateFeed() {
  const [checkType, setCheckType] = useState<null | string>(null);
  return (
    <Wrapper>
      <h2>새로운 피드 만들기</h2>
      <CreateFeedForm>
        <UploadImageContainer>
          <label htmlFor="upload_feed_image">
            <div>
              <FiUpload />
              <span>사진 / 영상</span>
            </div>
            <input id="upload_feed_image" type="file" />
          </label>
          <div id="upload_image_container">
            <div>
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
              <img
                src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
                alt="test_image"
              />
            </div>
          </div>
        </UploadImageContainer>
        <MainImageSelectBox>
          <h3>대표 이미지를 선택해주세요</h3>
          <small>
            업로드한 사진에서 대표 이미지를 선택해주세요. 대표이미지는{" "}
            <span>유료 컨텐츠</span>일 경우 구독자 및 일반 유저들에게{" "}
            <span>모자이크 이미지로 공개</span>됩니다
          </small>
          <div id="selectd_img_box">
            <img
              src="https://newsimg.hankookilbo.com/2020/05/10/202005101944069022_1.jpg"
              alt="test_image"
            />
          </div>
        </MainImageSelectBox>
        <PublishScope id="publish_scope">
          <h3>공개범위 설정</h3>
          <small>피드의 공개범위를 설정해보세요</small>
          <label
            htmlFor="publish_all"
            style={{
              borderColor:
                checkType === "publish_all"
                  ? "#f1c40f"
                  : "rgba(255, 255, 255, 0.5)",
            }}
          >
            <span
              style={{
                color: checkType === "publish_all" ? "#f1c40f" : "white",
              }}
            >
              전체공개{" "}
              <span>
                전체 공개설정시 <span>실시간 게시글</span>에 피드가 올라갑니다
              </span>
            </span>
            <AiOutlineCheck
              style={{
                color:
                  checkType === "publish_all"
                    ? "#f1c40f"
                    : "rgba(255, 255, 255, 0.6)",
              }}
            />
            <input
              onChange={(e) => setCheckType(e.target.id)}
              id="publish_all"
              type="radio"
              name="publish_scope"
            />
          </label>
          {checkType === "publish_all" ? (
            <AnimatePresence>
              <PublishAll
                variants={publishVariant}
                initial="start"
                animate="end"
                exit="exit"
              >
                <span>
                  해당 설정은 <span>무료공개</span> 설정입니다
                </span>

                <span className="publish_all_notice">
                  무료공개 설정은 실시간 게시글 및 유저들에게 추천피드로
                  보여집니다
                </span>
                <span className="publish_all_notice">
                  무료공개에서는 모든 연령층에게 공개되므로, 과도한 노출이 될 수
                  있는 피드는 삼가해주시기 바랍니다
                </span>
                <span className="publish_all_notice">
                  해당 피드는 모든 유저들에게 공개됩니다
                </span>
              </PublishAll>
            </AnimatePresence>
          ) : null}
          <label
            htmlFor="publish_subscriber"
            style={{
              borderColor:
                checkType === "publish_subscriber"
                  ? "#f1c40f"
                  : "rgba(255, 255, 255, 0.5)",
            }}
          >
            <span
              style={{
                color: checkType === "publish_subscriber" ? "#f1c40f" : "white",
              }}
            >
              구독자에게만 공개
            </span>
            <AiOutlineCheck
              style={{
                color:
                  checkType === "publish_subscriber"
                    ? "#f1c40f"
                    : "rgba(255, 255, 255, 0.6)",
              }}
            />
            <input
              onChange={(e) => setCheckType(e.target.id)}
              id="publish_subscriber"
              type="radio"
              name="publish_scope"
            />
          </label>
          {checkType === "publish_subscriber" ? (
            <AnimatePresence custom={checkType}>
              <PublishSubscriber
                variants={publishVariant}
                initial="start"
                animate="end"
                exit="exit"
              >
                <h3>공개 범위 설정하기</h3>
                <div id="membership_scope_container">
                  <label htmlFor="lv_1">
                    <span>Lv.1</span>
                    <span>크리에이터가 지정한 멤버쉽 이름</span>
                    <AiOutlineCheck />
                    <input id="lv_1" type="radio" name="membership_scope" />
                  </label>
                  <label htmlFor="lv_2">
                    <span>Lv.2</span>
                    <span>크리에이터가 지정한 멤버쉽 이름</span>
                    <AiOutlineCheck />
                    <input id="lv_2" type="radio" name="membership_scope" />
                  </label>
                  <label htmlFor="lv_3">
                    <span>Lv.3</span>
                    <span>크리에이터가 지정한 멤버쉽 이름</span>
                    <AiOutlineCheck />
                    <input id="lv_3" type="radio" name="membership_scope" />
                  </label>
                </div>
                <span id="describe_title">공개범위란?</span>
                <span id="describe_content">
                  A B C 플랜이 있고, A플랜의 가격이 가장 싸다고할때 A플랜을
                  선택할 경우 B, C 플랜은 자동으로 공개됩니다.
                </span>
                <span id="describe_content">
                  C플랜이 가장 프리미엄한 플랜이고 C플랜을 선택하셨다면 A, B
                  플랜에게는 공개되지 않습니다.
                </span>
              </PublishSubscriber>
            </AnimatePresence>
          ) : null}
          <label
            htmlFor="publish_paid"
            style={{
              borderColor:
                checkType === "publish_paid"
                  ? "#f1c40f"
                  : "rgba(255, 255, 255, 0.5)",
            }}
          >
            <span
              style={{
                color: checkType === "publish_paid" ? "#f1c40f" : "white",
              }}
            >
              유료공개
            </span>
            <AiOutlineCheck
              style={{
                color:
                  checkType === "publish_paid"
                    ? "#f1c40f"
                    : "rgba(255, 255, 255, 0.6)",
              }}
            />
            <input
              onChange={(e) => setCheckType(e.target.id)}
              id="publish_paid"
              type="radio"
              name="publish_scope"
            />
          </label>
          {checkType === "publish_paid" ? (
            <AnimatePresence custom={checkType}>
              <PublishPaid
                variants={publishVariant}
                initial="start"
                animate="end"
                exit="exit"
                id="publish_paid_container"
              >
                <h3>유료공개 가격</h3>
                <label htmlFor="publish_paid_price">
                  <span>가격</span>
                  <GiCrownCoin />
                  <input id="publish_paid_price" type="number" />
                  <small>가격은 0코인 이상이어야합니다</small>
                </label>
              </PublishPaid>
            </AnimatePresence>
          ) : null}
        </PublishScope>
        <FeedContent>
          <small>내용을 적어주세요 (선택)</small>
          <textarea id="feed_content_container" />
        </FeedContent>
        <label htmlFor="publish_feed_btn">
          <span>피드 올리기</span>
          <input id="publish_feed_btn" type="submit" />
        </label>
      </CreateFeedForm>
    </Wrapper>
  );
}

export default CreateFeed;
