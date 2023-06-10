import styled from "styled-components";
import { FiAlertCircle } from "react-icons/fi";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { BiMessageCheck } from "react-icons/bi";
import { GiCrownCoin, GiPlanePilot } from "react-icons/gi";
import { MdRequestQuote } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getMembershipPlan,
  postAddMembershipPlan,
} from "../../api/user/creatorApi";
import ModifyPlanForm from "./Component/ModifyPlanForm";
import DeletePlanBox from "./Component/DeletePlanBox";
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
const MaxPlanAlarm = styled.div`
  margin-top: 2vw;
  display: flex;
  justify-content: center;
  span {
    text-align: center;
    color: ${(props) => props.theme.textRedColor};
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
      small {
        text-shadow: none;
        font-size: 1.1vw;
        color: ${(props) => props.theme.textRedColor};
        margin-left: 1vw;
      }
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
      small {
        margin-left: 1vw;
        color: ${(props) => props.theme.textRedColor};
        text-shadow: none;
        font-size: 1.1vw;
      }
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
      small {
        text-shadow: none;
        font-size: 1.1vw;
        color: ${(props) => props.theme.textRedColor};
        margin-left: 1.1vw;
      }
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
const MembershipFunctionSettingBox = styled.div<MembershipSettingProps>`
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
      .publish_setting_container {
        label:nth-child(2) {
          border: 1px solid
            ${(props) =>
              props?.publish === "publish_30days"
                ? props.theme.accentColor
                : "none"};
          span {
            color: ${(props) =>
              props?.publish === "publish_30days"
                ? props.theme.accentColor
                : "white"};
          }
          .publish_check {
            color: ${(props) =>
              props?.publish === "publish_30days"
                ? props.theme.accentColor
                : "rgba(255,255,255,0.6)"};
          }
        }
        label:nth-child(3) {
          border: 1px solid
            ${(props) =>
              props?.publish === "publish_all"
                ? props.theme.accentColor
                : "none"};
          span {
            color: ${(props) =>
              props?.publish === "publish_all"
                ? props.theme.accentColor
                : "white"};
          }
          .publish_check {
            color: ${(props) =>
              props?.publish === "publish_all"
                ? props.theme.accentColor
                : "rgba(255,255,255,0.6)"};
          }
        }
      }
      .free_msg_setting {
        label:nth-child(2) {
          border: 1px solid
            ${(props) =>
              props?.msg_setting === "free_msg_ok"
                ? props.theme.accentColor
                : "none"};
          span {
            color: ${(props) =>
              props?.msg_setting === "free_msg_ok"
                ? props.theme.accentColor
                : "white"};
          }
          .msg_check {
            color: ${(props) =>
              props?.msg_setting === "free_msg_ok"
                ? props.theme.accentColor
                : "rgba(255,255,255,0.6)"};
          }
        }
        label:nth-child(3) {
          border: 1px solid
            ${(props) =>
              props?.msg_setting === "free_msg_not_ok"
                ? props.theme.accentColor
                : "none"};
          span {
            color: ${(props) =>
              props?.msg_setting === "free_msg_not_ok"
                ? props.theme.accentColor
                : "white"};
          }
          .msg_check {
            color: ${(props) =>
              props?.msg_setting === "free_msg_not_ok"
                ? props.theme.accentColor
                : "rgba(255,255,255,0.6)"};
          }
        }
      }
      .request_setting {
        label:nth-child(2) {
          border: 1px solid
            ${(props) =>
              props?.request_setting === "request_ok"
                ? props.theme.accentColor
                : "none"};
          span {
            color: ${(props) =>
              props?.request_setting === "request_ok"
                ? props.theme.accentColor
                : "white"};
          }
          .request_check {
            color: ${(props) =>
              props?.request_setting === "request_ok"
                ? props.theme.accentColor
                : "rgba(255,255,255,0.6)"};
          }
        }
        label:nth-child(3) {
          border: 1px solid
            ${(props) =>
              props?.request_setting === "request_not_ok"
                ? props.theme.accentColor
                : "none"};
          span {
            color: ${(props) =>
              props?.request_setting === "request_not_ok"
                ? props.theme.accentColor
                : "white"};
          }
          .request_check {
            color: ${(props) =>
              props?.request_setting === "request_not_ok"
                ? props.theme.accentColor
                : "rgba(255,255,255,0.6)"};
          }
        }
      }
    }

    #benefits_setting_components {
      display: flex;
      flex-direction: column;
      span {
        span {
          color: ${(props) => props.theme.textRedColor};
          text-shadow: none;
          font-size: 1.1vw;
          margin-left: 1vw;
        }
      }
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
    #notice_empty_plan {
      color: rgba(255, 255, 255, 0.5);
      text-align: center;
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
    font-size: 1.3vw;
    font-weight: 600;
    text-shadow: ${(props) => props.theme.textShadow};
    color: ${(props) => props.theme.accentColor};
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
      background-color: rgba(255, 255, 255, 0.1);
      border-radius: 10px;
      font-size: 1.1vw;
      color: white;
      padding: 1vw;
      white-space: pre-wrap;
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
interface MembershipSettingProps {
  publish: null | string;
  msg_setting: null | string;
  request_setting: null | string;
}
interface PlanDataProps {
  benefits_period: string | null;
  benefits_msg: string | null;
  benefits_request: string | null;
  membershipDescription: string;
  membershipName: string;
  membership_price: number | string;
  paid_message_value?: number | string;
}
interface DetailPlanDataProps {
  _id: string;
  owner: string;
  planName: string;
  planContent: string;
  planPrice: number;
  planBenefits: {
    freeMessage: { allow: boolean; pricePerMsg: number };
    period: boolean;
    userRequestion: boolean;
  };
}
const variant = {
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
    // transition: {
    //   duration: 0.2,
    // },
  },
};
function MembershipPlanSetting() {
  const queryClient = useQueryClient();
  const [planToggle, setPlanToggle] = useState(false);
  const [planId, setPlanId] = useState<null | string>(null);
  const { register, setError, formState, handleSubmit, watch, clearErrors } =
    useForm<PlanDataProps>();

  const { mutate, isLoading: addPlanLoading } = useMutation({
    mutationFn: postAddMembershipPlan,
    onSuccess: () => {
      toast.success("멤버쉽 플랜을 저장했습니다");
      setPlanToggle(false);
      return queryClient.invalidateQueries({
        queryKey: ["creator", "planData"],
      });
    },
    onError: () => {
      toast.error("멤버쉽 플랜을 저장하는데 문제가 발생했습니다");
    },
  });

  const { isLoading: getPlanLoading, data: planData } = useQuery<
    DetailPlanDataProps[]
  >({
    queryKey: ["creator", "planData"],
    queryFn: getMembershipPlan,
    staleTime: 5 * 60 * 1000,
    cacheTime: Infinity,
    meta: {
      message: "플랜 데이터를 불러오는데 실패했습니다",
    },
  });
  const onValid = (data: PlanDataProps) => {
    // 사용자가 free message 기능을 사용하지 않음
    if (data.paid_message_value === "") {
      setError("paid_message_value", {
        message: "코인을 입력해주세요",
      });
      return;
    }
    if (
      Number(data.paid_message_value) <= 0 ||
      Number(data.paid_message_value) > 10
    ) {
      setError("paid_message_value", {
        message: "1이상 10 이하의 코인을 입력해주세요",
      });
      return;
    }
    let addPlanData = {
      benefits_period: data.benefits_period,
      benefits_msg: data.benefits_msg,
      benefits_request: data.benefits_request,
      membershipDescription: data.membershipDescription,
      membershipName: data.membershipName,
      membership_price: Number(data.membership_price),
      paid_message_value: 0,
    };
    if (data.benefits_msg === "free_msg_not_ok") {
      if (!data.paid_message_value) {
        setError("paid_message_value", {
          message: "메세지당 코인 값을 입력해주세요",
        });
        return;
      }
      addPlanData.paid_message_value = Number(data.paid_message_value);
    }
    mutate(addPlanData);
  };
  return (
    <>
      <SettingSubList>
        <Title>
          <h2>멤버쉽 플랜 설정하기</h2>
          <small>구독자에게 단계별 플랜을 제공해보세요</small>
        </Title>
        {planData?.length === 3 ? (
          <MaxPlanAlarm>
            <span>알람은 최대 3개까지 만들 수 있습니다</span>
          </MaxPlanAlarm>
        ) : (
          <NewPlanToggle onClick={() => setPlanToggle((pre) => !pre)}>
            <AiOutlinePlus />새 플랜 만들기
          </NewPlanToggle>
        )}
        <AnimatePresence>
          {planToggle ? (
            <MembershipSettingForm
              variants={toggleVariant}
              initial="start"
              animate="end"
              exit="exit"
              onSubmit={handleSubmit(onValid)}
            >
              <MembershipNameLabel
                id="membership_name"
                htmlFor="membership_name"
              >
                <span>
                  멤버쉽 이름
                  {formState.errors?.membershipName ? (
                    <small>{formState.errors.membershipName.message}</small>
                  ) : null}
                </span>
                <input
                  {...register("membershipName", {
                    required: "멤버쉽 이름을 작성해주세요",
                  })}
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
                <span>
                  멤버쉽 내용
                  {formState.errors?.membershipDescription ? (
                    <small>
                      {formState.errors.membershipDescription.message}
                    </small>
                  ) : null}
                </span>
                <textarea
                  {...register("membershipDescription", {
                    required: "멤버쉽 설명글을 작성해주세요",
                  })}
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
                <span>
                  멤버쉽 가격 설정
                  {formState.errors?.membership_price ? (
                    <small>{formState.errors.membership_price.message}</small>
                  ) : null}
                </span>
                <div>
                  <span>월</span>
                  <input
                    {...register("membership_price", {
                      required: "가격을 입력해주세요",
                      min: {
                        value: 1000,
                        message: "가격은 최소 1000원 이상입니다",
                      },
                    })}
                    type="number"
                  />
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
              <MembershipFunctionSettingBox
                id="membership_function_box"
                publish={watch("benefits_period")}
                msg_setting={watch("benefits_msg")}
                request_setting={watch("benefits_request")}
              >
                <span>멤버쉽 혜택 설정</span>
                <div id="benefits_setting_box">
                  <div
                    id="benefits_setting_components"
                    className="publish_setting_container"
                  >
                    <span>
                      <FiAlertCircle />
                      유료 컨텐츠 공개제한
                      {formState.errors?.benefits_period ? (
                        <span>{formState.errors.benefits_period.message}</span>
                      ) : null}
                    </span>
                    <label htmlFor="publish_30days">
                      <span>멤버쉽 가입 30일 전 컨텐츠까지 공개</span>
                      <AiOutlineCheck className="publish_check" />
                      <input
                        {...register("benefits_period", {
                          required: "유료 컨텐츠 공개제한을 선택해주세요",
                        })}
                        id="publish_30days"
                        value="publish_30days"
                        type="radio"
                        name="benefits_period"
                      />
                    </label>
                    <label htmlFor="publish_all">
                      <span>모든 기간 컨텐츠 공개</span>
                      <AiOutlineCheck className="publish_check" />
                      <input
                        {...register("benefits_period", {
                          required: "유료 컨텐츠 공개제한을 선택해주세요",
                        })}
                        id="publish_all"
                        value="publish_all"
                        type="radio"
                        name="benefits_period"
                      />
                    </label>
                  </div>

                  <div
                    id="benefits_setting_components"
                    className="benefits_message free_msg_setting"
                  >
                    <span>
                      <BiMessageCheck />
                      메세지 설정하기
                      {formState.errors?.benefits_msg ? (
                        <span>{formState.errors.benefits_msg.message}</span>
                      ) : null}
                    </span>
                    <label htmlFor="free_msg_ok">
                      <span>무제한 무료 메세지</span>
                      <AiOutlineCheck className="msg_check" />
                      <input
                        {...register("benefits_msg", {
                          required: "유료 메세지를 설정해주세요",
                        })}
                        id="free_msg_ok"
                        value="free_msg_ok"
                        type="radio"
                        name="benefits_msg"
                      />
                    </label>
                    <label htmlFor="free_msg_not_ok">
                      <span>무료 메세지 사용 후 유료 메세지만 가능</span>
                      <AiOutlineCheck className="msg_check" />
                      <input
                        {...register("benefits_msg", {
                          required: "유료 메세지를 설정해주세요",
                        })}
                        id="free_msg_not_ok"
                        value="free_msg_not_ok"
                        type="radio"
                        name="benefits_msg"
                      />
                    </label>
                    <AnimatePresence custom={watch("benefits_msg")}>
                      {watch("benefits_msg") === "free_msg_not_ok" ? (
                        <motion.div
                          id="paid_message_setting_box"
                          variants={variant}
                          initial="start"
                          animate="end"
                          exit="exit"
                        >
                          <span>
                            코인 설정
                            {formState.errors?.paid_message_value ? (
                              <span>
                                {formState.errors.paid_message_value.message}
                              </span>
                            ) : null}
                          </span>
                          <div>
                            <span>
                              <GiCrownCoin />
                            </span>
                            <input
                              {...register("paid_message_value")}
                              onFocus={() => clearErrors("paid_message_value")}
                              type="number"
                            />
                            <span>메세지당</span>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>

                  <div
                    id="benefits_setting_components"
                    className="benefits_message request_setting"
                  >
                    <span>
                      <MdRequestQuote />
                      리퀘스트 설정
                      {formState.errors?.benefits_request ? (
                        <span>{formState.errors.benefits_request.message}</span>
                      ) : null}
                    </span>
                    <label htmlFor="request_ok">
                      <span>리퀘스트 신청 가능</span>
                      <AiOutlineCheck className="request_check" />
                      <input
                        {...register("benefits_request", {
                          required: "리퀘스트 가능 여부를 선택해주세요",
                        })}
                        value="request_ok"
                        id="request_ok"
                        type="radio"
                        name="benefits_request"
                      />
                    </label>
                    <label htmlFor="request_not_ok">
                      <span>리퀘스트 신청 불가능</span>
                      <AiOutlineCheck className="request_check" />
                      <input
                        {...register("benefits_request", {
                          required: "리퀘스트 가능 여부를 선택해주세요",
                        })}
                        value="request_not_ok"
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
                htmlFor="membership_submit"
              >
                <span>저장하기</span>
                <input type="submit" id="membership_submit" />
              </MembershipSubmitLabel>
            </MembershipSettingForm>
          ) : null}
        </AnimatePresence>
        <CurrentPlanBox id="current_plan_box">
          <h3>진행중인 플랜</h3>
          <small>클릭해서 플랜을 수정할 수 있습니다</small>
          {planData?.length === 0 ? (
            <span id="notice_empty_plan">등록된 플랜이 없습니다</span>
          ) : (
            planData?.map((plan, idx) => {
              return (
                <PlanBox
                  key={plan._id}
                  layoutId={plan._id}
                  onClick={() => setPlanId(plan._id)}
                >
                  <h2 id="member_ship_title">{`${idx + 1}. ${
                    plan.planName
                  }`}</h2>
                  <h3 id="member_ship_price">{`₩ ${plan.planPrice} / 월`}</h3>
                  <div id="craetor_setting_msg">
                    <span>{plan.planContent}</span>
                  </div>
                  <div id="official_setting">
                    <div id="official_notice_box">
                      <span>{`${
                        plan.planBenefits.period
                          ? "🟢 결제 30일 이전 포스팅까지 공개"
                          : "🟢 모든 포스트 열람가능"
                      }`}</span>
                      <span>{`${
                        plan.planBenefits.freeMessage.allow
                          ? "🟢 크리에이터에게 무료채팅"
                          : "🟢 크리에이터에게 유료채팅"
                      }`}</span>
                      {plan.planBenefits.userRequestion ? (
                        <span>🟢 크리에이터에게 리퀘스트 신청가능</span>
                      ) : null}
                    </div>
                  </div>
                </PlanBox>
              );
            })
          )}
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
              <ModifyPlanForm planId={planId} />
              <DeletePlanBox planId={planId} setPlanId={setPlanId} />
            </OverlayBox>
          </Overlay>
        ) : null}
      </AnimatePresence>
      s
    </>
  );
}

export default MembershipPlanSetting;
