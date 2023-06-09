import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import styled from "styled-components";
import {
  getMembershipPlan,
  postEditMembershipPlan,
} from "../../../api/user/creatorApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
const ModifyForm = styled.form`
  width: 100%;
  height: auto;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1vw;
  border-radius: 10px;
`;
const ModifyNameLabel = styled.label`
  &#modify_plan_name_box {
    width: 100%;
    display: flex;
    flex-direction: column;
    span {
      color: white;
      text-shadow: ${(props) => props.theme.textShadow};
      small {
        color: ${(props) => props.theme.textRedColor};
        font-size: 1vw;
        text-shadow: none;
        margin-left: 1vw;
      }
    }
    input[type="text"] {
      margin-top: 0.5vw;
      width: 60%;
      padding: 0.7vw 1vw;
      background-color: inherit;
      border-radius: 10px;
      border: 1px solid white;
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
      small {
        color: ${(props) => props.theme.textRedColor};
        font-size: 1vw;
        text-shadow: none;
        margin-left: 1vw;
      }
    }
    textarea {
      width: 80%;
      border: 1px solid white;
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
    padding: 1vw 0;
    border: 1px solid white;
    box-shadow: ${(props) => props.theme.textShadow};
    border-radius: 10px;
    transition: all 0.1s ease-in-out;
  }

  input[type="submit"] {
    display: none;
  }
`;
interface IProps {
  planId: string | null;
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
interface FData {
  planName: string;
  planContent: string;
}
function ModifyPlanForm({ planId }: IProps) {
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
  const [currentMembershipPlan, setCurrentMembershipPlan] =
    useState<null | DetailPlanDataProps>(null);
  const { register, setValue, setError, formState, handleSubmit, watch } =
    useForm<FData>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: postEditMembershipPlan,
    onSuccess: () => {
      toast.success("성공!");
      return queryClient.invalidateQueries({
        queryKey: ["creator", "planData"],
      });
    },
    onError: () => {
      toast.error("실패");
    },
  });
  useEffect(() => {
    const currentPlan = planData?.filter((plan) => plan._id === planId);
    if (!currentPlan || currentPlan.length === 0) {
      return;
    }
    setCurrentMembershipPlan({
      ...currentPlan[0],
    });
  }, [planData]);
  useEffect(() => {
    if (!currentMembershipPlan) {
      return;
    }
    setValue("planName", currentMembershipPlan.planName);
    setValue("planContent", currentMembershipPlan.planContent);
  }, [currentMembershipPlan]);
  const onValid = (data: FData) => {
    if (!planId) {
      return;
    }
    mutate({
      planName: data.planName,
      planContent: data.planContent,
      planId,
    });
  };
  return (
    <>
      {getPlanLoading ? null : (
        <ModifyForm onSubmit={handleSubmit(onValid)}>
          <ModifyNameLabel htmlFor="modify_plan_name" id="modify_plan_name_box">
            <span>
              플랜 이름
              {formState?.errors.planName ? (
                <small>{formState.errors.planName.message}</small>
              ) : null}
            </span>
            <input
              id="modify_plan_name"
              type="text"
              {...register("planName", {
                required: "플랜 제목을 입력해주세요",
              })}
            />
          </ModifyNameLabel>
          <ModifyContentLabel
            htmlFor="modify_plan_content"
            id="modify_plan_content_box"
          >
            <span>
              플랜 내용
              {formState?.errors.planContent ? (
                <small>{formState.errors.planContent.message}</small>
              ) : null}
            </span>
            <textarea
              id="modify_plan_content"
              {...register("planContent", {
                required: "플랜 내용을 입력해주세요",
              })}
            ></textarea>
          </ModifyContentLabel>
          <ModifySubmitLabel htmlFor="modify_plan_submit">
            <span>플랜 수정하기</span>
            <input id="modify_plan_submit" type="submit" />
          </ModifySubmitLabel>
        </ModifyForm>
      )}
    </>
  );
}

export default ModifyPlanForm;
