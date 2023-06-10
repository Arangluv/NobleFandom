import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { deleteMembershipPlan } from "../../../api/user/creatorApi";

const DeletePlanContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2vw;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1vw;
  border-radius: 10px;
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
    font-size: 1.1vw;
    color: white;
    height: auto;
  }
  button {
    background-color: ${(props) => props.theme.textRedColor};
    width: 100%;
    color: white;
    text-shadow: ${(props) => props.theme.textRedShadow};
    padding: 1vw 0;
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
    color: ${(props) => props.theme.textRedColor};
    text-shadow: none;
  }
`;
interface DeleteProps {
  planId: string;
  setPlanId: React.Dispatch<React.SetStateAction<string | null>>;
}
function DeletePlanBox({ planId, setPlanId }: DeleteProps) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteMembershipPlan,
    onSuccess: () => {
      toast.success("플랜을 삭제했습니다");
      setPlanId(null);
      return queryClient.invalidateQueries({
        queryKey: ["creator", "planData"],
      });
    },
    onError: () => {
      toast.error("플랜을 삭제하는데 실패했습니다");
    },
  });
  const handleDeleteClick = () => {
    if (window.confirm("플랜을 삭제하시겠습니까?")) {
      mutate({ planId });
    }
  };
  return (
    <DeletePlanContainer>
      <span>플랜삭제하기</span>
      <p>
        {`플랜을 삭제하실 경우, 기존 구독자는 더 이상 해당 상품을 구독할 수 없게됩니다.
기존 구독자들에게는 만료기간까지 해당 구독상품의 효과는 유지되며, 신규 가입자에게는 노출 되지 않습니다.`}
      </p>
      <button onClick={handleDeleteClick}>플랜 삭제하기</button>
    </DeletePlanContainer>
  );
}

export default DeletePlanBox;
