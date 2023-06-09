import axios from "axios";
import BASE_URL from "../../url";
interface MessageSettingProps {
  isReceiveAll: boolean;
  freeMessageQuantuty: number;
  coinPerMessage: number;
  subscriptionMessage: string;
  extraError?: string;
  _id: string;
}
interface PlanDataProps {
  benefits_period: string | null;
  benefits_msg: string | null;
  benefits_request: string | null;
  membershipDescription: string;
  membershipName: string;
  membership_price: number;
  paid_message_value?: number;
}
interface ModifyPlanProps {
  planName: string;
  planContent: string;
  planId: string;
}
export const getMessageSetting = async () => {
  return await axios({
    url: `${BASE_URL}/creators/get-messagesetting`,
    method: "GET",
    withCredentials: true,
  }).then((result) => result.data.messageSetting);
};

export const postEditMessageSetting = async (data: MessageSettingProps) => {
  return await axios({
    url: `${BASE_URL}/creators/post-edit-messagesetting`,
    method: "POST",
    withCredentials: true,
    data,
  });
};

export const getPersonalScreenUserData = async (userId: string) => {
  if (userId === "") {
    return;
  }
  return await axios({
    url: `${BASE_URL}/users/get-personalscreen-userdata`,
    params: { userId },
    method: "GET",
  })
    .then((result) => result.data)
    .catch((error) => error.response.data);
};

export const postAddMembershipPlan = async (plan: PlanDataProps) => {
  return await axios({
    url: `${BASE_URL}/creators/add-membership-plan`,
    method: "POST",
    data: plan,
    withCredentials: true,
  });
};

export const getMembershipPlan = async () => {
  return await axios({
    url: `${BASE_URL}/creators/get-plandata`,
    method: "GET",
    withCredentials: true,
  })
    .then((result) => result.data.data)
    .catch((error: any) => error.response.data);
};

export const postEditMembershipPlan = async (modifiedPlan: ModifyPlanProps) => {
  return await axios({
    url: `${BASE_URL}/creators/modify-plan`,
    method: "POST",
    data: modifiedPlan,
    withCredentials: true,
  });
};
