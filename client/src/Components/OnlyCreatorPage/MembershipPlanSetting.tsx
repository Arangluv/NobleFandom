import styled from "styled-components";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { BiMessageCheck } from "react-icons/bi";
import { GiCrownCoin } from "react-icons/gi";
import { MdRequestQuote } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 1vw;
  padding-left: 3vw;
  display: flex;
  flex-direction: column;
  padding-bottom: 3vw;
  overflow-y: scroll;
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
const Title = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding-bottom: 0.5vw;
  border-bottom: 1px solid white;
  h2 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
  }
  small {
    color: ${(props) => props.theme.accentColor};
    font-size: 1vw;
  }
`;
const NewPlanToggle = styled.button`
  margin-top: 1vw;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-shadow: ${(props) => props.theme.textShadow};
  font-size: 1.5vw;
  padding: 1vw 0;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.textShadow};
  transition: 0.1s ease-in-out;
  svg {
    margin-right: 0.5vw;
  }
  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
    color: ${(props) => props.theme.accentColor};
  }
`;
const MembershipSettingForm = styled(motion.form)`
  width: 100%;
  height: 30vw;
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
`;
const MembershipNameLabel = styled.label`
  &#membership_name {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-bottom: 1vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 2vw;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    input[type="text"] {
      width: 60%;
      margin-top: 0.5vw;
      background-color: black;
      border-radius: 5px;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      padding: 1vw;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    input[type="text"]::placeholder {
      color: rgba(255, 255, 255, 0.6);
      text-shadow: none;
    }
    input[type="text"]:focus {
      outline: none;
      border-color: ${(props) => props.theme.accentColor};
    }
    small {
      color: rgba(255, 255, 255, 0.7);
      margin-top: 0.5vw;
      font-size: 1vw;
      span {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;
const MembershipContentLabel = styled.label`
  &#membership_content {
    display: flex;
    flex-direction: column;
    padding-bottom: 1vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 2vw;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    textarea {
      height: 15vw;
      border-radius: 5px;
      background-color: black;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      margin-top: 0.5vw;
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      padding: 1vw;
    }
    textarea::placeholder {
      color: rgba(255, 255, 255, 0.6);
      text-shadow: none;
    }
    textarea:focus {
      outline: none;
      border-color: ${(props) => props.theme.accentColor};
    }
    small {
      color: rgba(255, 255, 255, 0.7);
      margin-top: 0.5vw;
      font-size: 1vw;
      span {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;
const MembershipPriceSettingLabel = styled.label`
  &#membership_price_setting {
    display: flex;
    flex-direction: column;
    padding-bottom: 1vw;
    border-bottom: 1px solid rgba(255, 255, 255, 0.5);
    margin-bottom: 2vw;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    div {
      display: flex;
      align-items: center;
      margin-top: 0.5vw;
      span {
        padding: 0 1vw;
        display: flex;
        align-items: center;
        height: 3vw;
      }
      & > span:nth-child(1) {
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border: 1px solid white;
        border-right: none;
        box-shadow: ${(props) => props.theme.textShadow};
      }
      & > span:last-child {
        color: ${(props) => props.theme.accentColor};
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        border: 1px solid white;
        border-left: none;
        box-shadow: ${(props) => props.theme.textShadow};
      }
      input[type="number"] {
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadow};
        height: 3vw;
        background-color: black;
        text-align: center;
        color: white;
      }
      input[type="number"]:focus {
        outline: none;
      }
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
    small {
      font-size: 1vw;
      color: rgba(255, 255, 255, 0.7);
      margin-top: 0.5vw;
      span {
        text-shadow: none;
        color: ${(props) => props.theme.accentColor};
      }
    }
    #price_important_notice {
      display: flex;
      align-items: center;
      span {
        color: rgba(255, 255, 255, 0.7);
        span {
          color: ${(props) => props.theme.accentColor};
        }
      }
      svg {
        font-size: 1.3vw;
        color: #ff4545;
        margin-right: 0.5vw;
      }
    }
  }
`;
const MembershipFunctionSettingBox = styled.div`
  &#membership_function_box {
    display: flex;
    flex-direction: column;
    /* border: 1px solid red; */
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    #benefits_setting_box {
      /* border: 1px solid blue; */
      padding: 1vw;
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      margin-top: 1vw;
    }
    #benefits_setting_components {
      display: flex;
      flex-direction: column;
      small {
        font-size: 1.1vw;
        text-shadow: none;
        margin-top: 1vw;
        display: flex;
        flex-direction: column;
        span:nth-child(1) {
          color: ${(props) => props.theme.accentColor};
        }
        span:nth-child(2) {
          color: white;
          font-size: 1vw;
          margin-top: 0.5vw;
          text-shadow: none;
        }
      }
      label {
        background-color: rgba(255, 255, 255, 0.2);
        margin-top: 1vw;
        padding: 0.5vw 1vw;
        border-radius: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        svg {
          color: rgba(255, 255, 255, 0.6);
        }
        span {
          text-shadow: none;
          font-size: 1.1vw;
        }
        input[type="radio"] {
          display: none;
        }
      }
      label:hover {
        cursor: pointer;
        box-shadow: ${(props) => props.theme.textShadow};
      }
      #paid_message_setting_box {
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadow};
        border-radius: 10px;
        padding: 1vw;
        margin-top: 1vw;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        & > span {
          font-size: 1.1vw;
          color: ${(props) => props.theme.accentColor};
        }
        div {
          display: flex;
          align-items: center;
          input[type="number"] {
            background-color: inherit;
            text-align: center;
            height: 40px;
            border: 1px solid white;
            border-left: none;
            color: white;
            caret-color: white;
            border-right: none;
          }
          input[type="number"]:focus {
            outline: none;
          }
          input[type="number"]::-webkit-outer-spin-button,
          input[type="number"]::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          span:first-child {
            display: flex;
            border: 1px solid white;
            border-top-left-radius: 10px;
            border-bottom-left-radius: 10px;
            align-items: center;
            padding: 0.5vw;
            height: 40px;
            svg {
              color: ${(props) => props.theme.accentColor};
              font-size: 2vw;
            }
          }
          span:last-child {
            font-size: 1vw;
            color: ${(props) => props.theme.accentColor};
            border: 1px solid white;
            border-top-right-radius: 10px;
            border-bottom-right-radius: 10px;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 0.5vw;
            border-left: none;
          }
        }
      }
      & > span {
        font-size: 1.2vw;
        display: flex;
        align-items: center;
        text-shadow: none;
        font-weight: 600;
        svg {
          color: ${(props) => props.theme.accentColor};
          margin-right: 0.5vw;
        }
      }
    }
    .benefits_message {
      margin-top: 3vw;
    }
  }
`;
const MembershipSubmitLabel = styled.label`
  &#membership_apply {
    border: 1px solid white;
    border-radius: 10px;
    box-shadow: ${(props) => props.theme.textShadow};
    margin-top: 1vw;
    width: 30%;
    text-align: center;
    padding: 0.5vw 0;
    transition: 0.1s ease-in-out;
    span {
      color: white;
      font-size: 1.3vw;
      font-weight: 600;
      text-shadow: ${(props) => props.theme.textShadow};
      transition: 0.1s ease-in-out;
    }
    input[type="submit"] {
      display: none;
    }
    &:hover {
      cursor: pointer;
      border-color: ${(props) => props.theme.accentColor};
      span {
        color: ${(props) => props.theme.accentColor};
      }
    }
  }
`;

const CurrentPlanBox = styled.div`
  &#current_plan_box {
    width: 100%;
    height: 30vw;
    margin-top: 2vw;
    display: flex;
    flex-direction: column;
    h3 {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      margin-bottom: 0;
    }
    small {
      margin-top: 0;
      color: ${(props) => props.theme.accentColor};
      font-size: 1vw;
      padding-bottom: 0.5vw;
      border-bottom: 1px solid white;
      margin-bottom: 1vw;
    }
  }
`;
const PlanBox = styled(motion.div)`
  width: 100%;
  border: 1px solid white;
  border-radius: 10px;
  padding: 1vw;
  margin-bottom: 1vw;
  transition: all 0.1s ease-in-out;
  &:hover {
    cursor: pointer;
    border-color: ${(props) => props.theme.accentColor};
  }
  #member_ship_title {
    font-size: 1.2vw;
    color: rgba(255, 255, 255, 0.9);
  }
  #member_ship_price {
    margin-top: 1vw;
    font-size: 1.5vw;
    color: ${(props) => props.theme.accentColor};
    text-shadow: ${(props) => props.theme.textShadow};
  }
  #craetor_setting_msg {
    display: flex;
    flex-direction: column;
    margin-top: 0.5vw;
    span {
      font-size: 1.1vw;
      color: white;
      padding-left: 1vw;
    }
  }
  #official_setting {
    display: flex;
    width: 100%;
    margin-top: 1vw;
    background-color: rgba(255, 255, 255, 0.2);
    padding: 1vw;
    border-radius: 10px;
    #official_notice_box {
      width: 60%;
      display: flex;
      flex-direction: column;
      span {
        color: white;
        font-size: 1vw;
        font-weight: 600;
      }
    }
  }
`;
const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OverlayBox = styled(motion.div)`
  width: 60%;
  height: auto;
  padding: 1vw;
  border: 1px solid white;
  box-shadow: ${(props) => props.theme.textShadow};
  background-color: black;
  border-radius: 10px;
`;
const ModifyForm = styled.form`
  width: 100%;
  height: auto;
  padding-bottom: 2vw;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
`;
const ModifyNameLabel = styled.label`
  &#modify_plan_name_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    input[type="text"] {
      margin-top: 0.5vw;
      width: 60%;
      padding: 0.7vw 1vw;
      background-color: black;
      border-radius: 10px;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.boxShadow};
      color: white;
    }
    input[type="text"]:focus {
      outline: none;
      border-color: ${(props) => props.theme.accentColor};
    }
  }
`;
const ModifyContentLabel = styled.label`
  &#modify_plan_content_box {
    margin-top: 1vw;
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
    }
    textarea {
      width: 80%;
      border: 1px solid white;
      box-shadow: ${(props) => props.theme.textShadow};
      height: 15vw;
      border-radius: 10px;
      color: white;
      padding: 1vw;
      margin-top: 0.5vw;
      background-color: inherit;
      white-space: pre-wrap;
    }
    textarea:focus {
      outline: none;
      border-color: ${(props) => props.theme.accentColor};
    }
  }
`;
const ModifySubmitLabel = styled.label`
  margin-top: 2vw;
  width: 100%;
  display: flex;
  flex-direction: column;
  &:hover {
    cursor: pointer;
    span {
      border-color: ${(props) => props.theme.accentColor};
      color: ${(props) => props.theme.accentColor};
    }
  }
  span {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    border: 1px solid red;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5vw 0;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
  }

  input[type="submit"] {
    display: none;
  }
`;
const DeletePlanBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  span {
    text-shadow: ${(props) => props.theme.textShadow};
    color: white;
  }
  p {
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 1vw;
    white-space: pre-wrap;
    margin: 0.5vw 0;
    font-size: 1vw;
    color: white;
  }
  button {
    width: 100%;
    color: ${(props) => props.theme.textRedColor};
    text-shadow: ${(props) => props.theme.textRedShadow};
    padding: 1vw 0;
    background-color: black;
    border: 1px solid ${(props) => props.theme.textRedColor};
    border-radius: 10px;
    font-weight: 600;
    font-size: 1.3vw;
    margin-top: 1vw;
    transition: all 0.1s ease-in-out;
  }
  button:hover {
    cursor: pointer;
    background-color: white;
  }
`;
const toggleVariant = {
  start: {
    height: 0,
    opacity: 0,
  },
  end: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};
const overlayVariant = {
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
const boxVariant = {
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

function MembershipPlanSetting() {
  const [planToggle, setPlanToggle] = useState(false);
  const [planId, setPlanId] = useState<null | string>(null);
  return (
    <>
      <SettingSubList>
        <Title>
          <h2>멤버쉽 플랜 설정하기</h2>
          <small>구독자에게 단계별 플랜을 제공해보세요</small>
        </Title>
        <NewPlanToggle onClick={() => setPlanToggle((pre) => !pre)}>
          <AiOutlinePlus />새 플랜 만들기
        </NewPlanToggle>
        <AnimatePresence>
          {planToggle ? (
            <MembershipSettingForm
              variants={toggleVariant}
              initial="start"
              animate="end"
              exit="exit"
            >
              <MembershipNameLabel
                id="membership_name"
                htmlFor="membership_name"
              >
                <span>멤버쉽 이름</span>
                <input
                  type="text"
                  id="membership_name"
                  placeholder="멤버쉽 이름을 설정해주세요"
                />
                <small>
                  2개 이상의 플랜을 계획하고 계신다면 <span>이름의 중복</span>은
                  피해주세요
                </small>
              </MembershipNameLabel>
              <MembershipContentLabel
                id="membership_content"
                htmlFor="membership_content"
              >
                <span>멤버쉽 내용</span>
                <textarea
                  name=""
                  id="membership_content"
                  placeholder={`자세한 멤버쉽 내용을 적어주세요.
ex) 
- 미공개 컨텐츠 열람가능
- 유료 / 무료 메세지 여부 등등 `}
                />
                <small>
                  유저들이 구독을 선택할 때{" "}
                  <span>가격 다음으로 많이보는 항목</span>
                  이에요!
                </small>
                <small>해당 플랜을 잘 설명해주는 설명을 적어주세요</small>
              </MembershipContentLabel>
              <MembershipPriceSettingLabel id="membership_price_setting">
                <span>멤버쉽 가격 설정</span>
                <div>
                  <span>월</span>
                  <input type="number" />
                  <span>₩</span>
                </div>
                <small>
                  가격은 최소 <span>₩1,000</span> 이상입니다
                </small>
                <small id="price_important_notice">
                  <FiAlertCircle />
                  <span>
                    한번 설정한 가격은 <span>다시 바꿀 수 없으니</span>{" "}
                    주의해주세요
                  </span>
                </small>
              </MembershipPriceSettingLabel>
              <MembershipFunctionSettingBox id="membership_function_box">
                <span>멤버쉽 혜택 설정</span>
                <div id="benefits_setting_box">
                  <div id="benefits_setting_components">
                    <span>
                      <FiAlertCircle />
                      유료 컨텐츠 공개제한
                    </span>
                    <label htmlFor="publish_30days">
                      <span>멤버쉽 가입 30일 전 컨텐츠까지 공개</span>
                      <AiOutlineCheck />
                      <input
                        id="publish_30days"
                        type="radio"
                        name="benefits_period"
                      />
                    </label>
                    <label htmlFor="publish_all">
                      <span>모든 기간 컨텐츠 공개</span>
                      <AiOutlineCheck />
                      <input
                        id="publish_all"
                        type="radio"
                        name="benefits_period"
                      />
                    </label>
                  </div>

                  <div
                    id="benefits_setting_components"
                    className="benefits_message"
                  >
                    <span>
                      <BiMessageCheck />
                      메세지 설정하기
                    </span>
                    <label htmlFor="free_msg_ok">
                      <span>무료 메세지 가능</span>
                      <AiOutlineCheck />
                      <input
                        id="free_msg_ok"
                        type="radio"
                        name="benefits_msg"
                      />
                    </label>
                    <label htmlFor="free_msg_not_ok">
                      <span>유료 메세지만 가능</span>
                      <AiOutlineCheck />
                      <input
                        id="free_msg_not_ok"
                        type="radio"
                        name="benefits_msg"
                      />
                    </label>
                    <div id="paid_message_setting_box">
                      <span>코인 설정</span>
                      <div>
                        <span>
                          <GiCrownCoin />
                        </span>
                        <input type="number" />
                        <span>메세지당</span>
                      </div>
                    </div>
                  </div>

                  <div
                    id="benefits_setting_components"
                    className="benefits_message"
                  >
                    <span>
                      <MdRequestQuote />
                      리퀘스트 설정
                    </span>
                    <label htmlFor="request_ok">
                      <span>리퀘스트 신청 가능</span>
                      <AiOutlineCheck />
                      <input
                        id="request_ok"
                        type="radio"
                        name="benefits_request"
                      />
                    </label>
                    <label htmlFor="request_not_ok">
                      <span>리퀘스트 신청 불가능</span>
                      <AiOutlineCheck />
                      <input
                        id="request_not_ok"
                        type="radio"
                        name="benefits_request"
                      />
                    </label>
                    <small>
                      <span>리퀘스트란?</span>
                      <span>
                        리퀘스트는 구독자가 크리에이터에게 노블코인을 지불하여
                        특정 컨텐츠를 신청할 수 있는 기능입니다
                      </span>
                      <span>자세한 사항은 "여기서" 확인해주세요</span>
                    </small>
                  </div>
                </div>
              </MembershipFunctionSettingBox>
              <MembershipSubmitLabel
                id="membership_apply"
                htmlFor="membership_apply"
              >
                <span>저장하기</span>
                <input type="submit" id="membership_apply" />
              </MembershipSubmitLabel>
            </MembershipSettingForm>
          ) : null}
        </AnimatePresence>
        <CurrentPlanBox id="current_plan_box">
          <h3>진행중인 플랜</h3>
          <small>클릭해서 플랜을 수정할 수 있습니다</small>
          <PlanBox layoutId="lv1" onClick={() => setPlanId("lv1")}>
            <h2 id="member_ship_title">1. 멤버쉽 이름</h2>
            <h3 id="member_ship_price">₩70,000 / 월</h3>
            <div id="craetor_setting_msg">
              <span>크리에이터가 지정 메세지</span>
              <span>유료채팅 3회</span>
              <span>더나은 더보기</span>
              <span>아무게 아무게</span>
            </div>
            <div id="official_setting">
              <div id="official_notice_box">
                <span>🟢 크리에이터에게 유료채팅</span>
                <span>🟢 결제 30일 이전 포스팅까지 공개</span>
              </div>
            </div>
          </PlanBox>
          <PlanBox>
            <h2 id="member_ship_title">1. 멤버쉽 이름</h2>
            <h3 id="member_ship_price">₩70,000 / 월</h3>
            <div id="craetor_setting_msg">
              <span>크리에이터가 지정 메세지</span>
              <span>유료채팅 3회</span>
              <span>더나은 더보기</span>
              <span>아무게 아무게</span>
            </div>
            <div id="official_setting">
              <div id="official_notice_box">
                <span>🟢 크리에이터에게 유료채팅</span>
                <span>🟢 결제 30일 이전 포스팅까지 공개</span>
              </div>
            </div>
          </PlanBox>
        </CurrentPlanBox>
      </SettingSubList>
      <AnimatePresence>
        {planId ? (
          <Overlay
            onClick={() => setPlanId(null)}
            variants={overlayVariant}
            initial="start"
            animate="end"
            exit="exit"
          >
            <OverlayBox
              layoutId={planId}
              variants={boxVariant}
              initial="start"
              animate="end"
              exit="exit"
              onClick={(event) => event.stopPropagation()}
            >
              <ModifyForm>
                <ModifyNameLabel
                  htmlFor="modify_plan_name"
                  id="modify_plan_name_box"
                >
                  <span>플랜 이름</span>
                  <input
                    id="modify_plan_name"
                    type="text"
                    value="클릭한 플랜의 제목을 가져옵니다."
                  />
                </ModifyNameLabel>
                <ModifyContentLabel
                  htmlFor="modify_plan_content"
                  id="modify_plan_content_box"
                >
                  <span>플랜 내용</span>
                  <textarea
                    id="modify_plan_content"
                    value="클릭한 플랜의 내용을 가져옵니다"
                  ></textarea>
                </ModifyContentLabel>
                <ModifySubmitLabel htmlFor="modify_plan_submit">
                  <span>플랜 수정하기</span>
                  <input id="modify_plan_submit" type="submit" />
                </ModifySubmitLabel>
              </ModifyForm>
              <DeletePlanBox>
                <span>플랜삭제하기</span>
                <p>
                  {`플랜 삭제에 대한 블라 블라 설명글이 들어갑니다
                    블라블라 블라블라
                    브랇ㄴ블르르르
                    ㄴㅁㅇㅁㄴㅇㅁㄴㅇㅁ넝ㄴㅁ언ㅁ언ㅁ어ㅑ
                    ㅁㄴ엄ㄴ언ㅁ야넘언ㅁ다파ㅓ랴;채퍄ㅓㄴㅂ어ㅓ냐ㅗ넌마
                  `}
                </p>
                <button>플랜 삭제하기</button>
              </DeletePlanBox>
            </OverlayBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default MembershipPlanSetting;
