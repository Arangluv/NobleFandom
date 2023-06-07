import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getMessageSetting,
  postEditMessageSetting,
} from "../../api/user/creatorApi";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const SettingSubList = styled.div`
  width: 80%;
  height: 100%;
  margin-left: 1vw;
  padding-left: 3vw;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  h2 {
    color: white;
    text-shadow: ${(props) => props.theme.textShadow};
    font-weight: 600;
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
    margin-bottom: 1vw;
  }
`;
const SelectReciveBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 3vw;
  h2 {
    font-size: 1.2vw;
    color: ${(props) => props.theme.accentColor};
    text-shadow: ${(props) => props.theme.textShadow};
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
  }
  #recive_setting_container {
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    div:first-child {
      margin-top: 0.5vw;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: auto;
      padding: 1vw 0;
      position: relative;
      #select_container {
        position: absolute;
        right: 1vw;
        width: 4vw;
        height: 2vw;
        display: flex;
        align-items: center;
        flex-direction: row;
        padding: 0.2vw;
        border-radius: 15px;
        background-color: rgba(255, 255, 255, 0.3);
        div {
          margin-top: 0;
          width: 1.8vw;
          height: 1.8vw;
          border-radius: 50%;

          background-color: rgba(255, 255, 255, 0.4);
        }
      }
      div:hover {
        cursor: pointer;
      }
    }
    span {
      color: white;
      font-size: 1.1vw;
      text-shadow: ${(props) => props.theme.textShadow};
    }
  }
`;
const PaidMsgBox = styled.div`
  width: 100%;
  height: auto;
  margin-top: 1vw;
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  padding-top: 1vw;
  h2 {
    font-size: 1.2vw;
    color: ${(props) => props.theme.accentColor};
    text-shadow: ${(props) => props.theme.textShadow};
    padding-bottom: 0.5vw;
    border-bottom: 1px solid white;
  }
  form {
    margin-top: 1vw;
    width: 100%;
    height: auto;
    label {
      display: flex;
      width: 100%;
      justify-content: space-between;
      margin-bottom: 0.5vw;
      span {
        color: white;
        font-size: 1.1vw;
        text-shadow: ${(props) => props.theme.textShadowThin};
        small {
          color: ${(props) => props.theme.textRedColor};
          font-size: 1vw;
          text-shadow: none;
          margin-left: 2vw;
        }
      }
      input[type="number"] {
        background-color: black;
        border: none;
        border-bottom: 1px solid ${(props) => props.theme.accentColor};
        text-align: center;
        color: ${(props) => props.theme.accentColor};
        font-size: 1vw;
        font-weight: 600;
        padding-bottom: 0.7vw;
      }
      input[type="number"]::placeholder {
        color: rgba(241, 196, 15, 0.7);
      }
      input[type="number"]:focus {
        outline: none;
      }
      input[type="number"]::-webkit-outer-spin-button,
      input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
      }
      input::placeholder {
        color: rgba(255, 255, 255, 0.8);
      }
    }
    label:first-child {
      margin-bottom: 1vw;
    }
    .notice_setting {
      color: rgba(255, 255, 255, 0.7);
      font-size: 1vw;
      display: block;
    }
    label[for="init_message_setting"] {
      margin-top: 1vw;
      textarea {
        width: 50%;
        background-color: black;
        border: 1px solid white;
        box-shadow: ${(props) => props.theme.textShadowThin};
        color: white;
        font-size: 1.1vw;
        padding: 1vw;
        border-radius: 10px;
        height: 10vw;
      }
      textarea:focus {
        outline: none;
      }
    }
    input[type="submit"] {
      width: 100%;
      border: 1px solid white;
      border-radius: 10px;
      background-color: black;
      color: white;
      margin-top: 2vw;
      padding: 1.5vw;
      transition: all 0.1s ease-in-out;
      font-size: 1.3vw;
    }
    input[type="submit"]:hover {
      cursor: pointer;
      color: ${(props) => props.theme.accentColor};
      border-color: ${(props) => props.theme.accentColor};
    }
  }
`;
const NotificationBox = styled.div`
  margin-top: 1vw;
  span {
    display: flex;
    flex-direction: column;
    small {
      color: ${(props) => props.theme.textRedColor};
      font-size: 1vw;
    }
  }
`;
interface MessageDataProps {
  _id: string;
  owner: string;
  publicRecive: boolean;
  freeMessageQuantuty: number;
  coinPerMessage: number;
  initSubscriptionMessage: string;
}
interface MessageSettingProps {
  isReceiveAll: boolean;
  _id: string;
  freeMessageQuantuty: number;
  coinPerMessage: number;
  subscriptionMessage: string;
  extraError?: string;
}
function MessageSetting() {
  const [receiveAll, setReceiveAll] = useState(true);
  const { register, formState, setValue, handleSubmit } =
    useForm<MessageSettingProps>();
  const { data: messageSettingData, isLoading } = useQuery<MessageDataProps>({
    queryKey: ["messageSetting"],
    queryFn: getMessageSetting,
    cacheTime: Infinity,
  });
  // Post Message Setting
  const queryClient = useQueryClient();
  const { mutate, isLoading: postMessageSettingLoading } = useMutation({
    mutationFn: postEditMessageSetting,
    onSuccess: () => {
      toast.success("메세지 세팅을 성공적으로 저장했습니다!");
      return queryClient.invalidateQueries({
        queryKey: ["messageSetting"],
      });
    },
    onError: () => {
      toast.error("메세지 세팅을 저장하는데 실패했습니다");
    },
  });
  // Set initial input value
  useEffect(() => {
    if (isLoading) {
      return;
    }
    if (messageSettingData?.coinPerMessage) {
      setValue("coinPerMessage", messageSettingData?.coinPerMessage);
    }
    if (messageSettingData?.freeMessageQuantuty) {
      setValue("freeMessageQuantuty", messageSettingData.freeMessageQuantuty);
    }

    if (messageSettingData?.initSubscriptionMessage) {
      setValue(
        "subscriptionMessage",
        messageSettingData.initSubscriptionMessage
      );
    }
    if (messageSettingData?.publicRecive !== undefined) {
      setReceiveAll(messageSettingData.publicRecive);
      setValue("isReceiveAll", messageSettingData.publicRecive);
    }
  }, [isLoading]);
  // Message Receive Setting
  useEffect(() => {
    setValue("isReceiveAll", receiveAll);
  }, [receiveAll]);
  // _id Setting
  useEffect(() => {
    if (messageSettingData?._id) {
      setValue("_id", messageSettingData?._id);
      return;
    }
  }, [isLoading]);
  const onValid = (data: MessageSettingProps) => {
    mutate(data);
  };
  // motion animation
  const wrapperCss = {
    justifyContent: receiveAll ? "flex-end" : "flex-start",
    backgroundColor: receiveAll
      ? "rgba(255, 255, 255, 0.9)"
      : "rgba(255,255,255,0.3)",
  };
  const subWrapperCss = {
    backgroundColor: receiveAll ? "#f9ca24" : "rgba(255,255,255,0.3)",
  };
  return (
    <SettingSubList>
      <Title>
        <h2>메세지 설정</h2>
      </Title>
      <SelectReciveBox>
        <h2>메세지 수신 설정</h2>
        <div id="recive_setting_container">
          <div>
            <span>모든 유저에게 받기</span>
            <AnimatePresence initial={false}>
              <motion.div
                style={{ ...wrapperCss }}
                initial={false}
                onClick={() => setReceiveAll((pre) => !pre)}
                id="select_container"
              >
                <motion.div
                  initial={false}
                  style={{ ...subWrapperCss }}
                  layout
                ></motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </SelectReciveBox>
      <NotificationBox>
        {!receiveAll ? (
          <span>
            <small>모든 유저에게 메세지 받기 기능을 비활성화 하셨습니다</small>
            <small>
              비활성화 하신 경우, 오직 구독자에게만 메세지를 받을 수 있습니다
            </small>
          </span>
        ) : null}
      </NotificationBox>
      <PaidMsgBox>
        <h2>메세지 설정</h2>
        <form onSubmit={handleSubmit(onValid)}>
          <label htmlFor="free_message_quantity">
            <span>
              무료 메세지 수
              {formState?.errors?.freeMessageQuantuty ? (
                <small>{formState?.errors?.freeMessageQuantuty.message}</small>
              ) : null}
            </span>
            <input
              {...register("freeMessageQuantuty", {
                required: "반드시 1 이상의 숫자를 입력해주세요",
                max: {
                  value: 50,
                  message: "무료메세지는 50을 초과할 수 없습니다",
                },
                min: {
                  value: 1,
                  message: "반드시 1 이상의 숫자를 입력해주세요",
                },
              })}
              id="free_message_quantity"
              type="number"
              placeholder="무료 메세지 한도"
            />
          </label>
          <label htmlFor="message_per_coin">
            <span>
              유료 메세지 코인
              {formState?.errors?.coinPerMessage ? (
                <small>{formState?.errors?.coinPerMessage.message}</small>
              ) : null}
            </span>
            <input
              {...register("coinPerMessage", {
                required: "반드시 1 이상의 숫자를 입력해주세요",
                max: {
                  value: 10,
                  message: "메세지당 코인가격은 10코인을 초과할 수 없습니다",
                },
                min: {
                  value: 1,
                  message: "반드시 1 이상의 숫자를 입력해주세요",
                },
              })}
              id="message_per_coin"
              type="number"
              placeholder="메세지 당 코인 수"
            />
          </label>
          <span className="notice_setting">
            일반 사용자에게 받을 수 있는 무료 메세지의 수를 설정할 수 있습니다.
            (최소 1개이상)
          </span>
          <span className="notice_setting">
            유료메세지는 건당 최대 10개까지 가능합니다.
          </span>
          <label htmlFor="init_message_setting">
            <span>구독 / 팔로우 시 메세지 설정</span>
            <textarea
              {...register("subscriptionMessage")}
              id="init_message_setting"
              placeholder="메세지 내용 입력"
            />
          </label>
          <input
            disabled={postMessageSettingLoading}
            type="submit"
            value="저장하기"
          />
        </form>
      </PaidMsgBox>
    </SettingSubList>
  );
}

export default MessageSetting;
