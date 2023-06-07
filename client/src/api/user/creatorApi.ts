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
