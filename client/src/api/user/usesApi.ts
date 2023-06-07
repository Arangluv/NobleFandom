import axios, { AxiosResponse } from "axios";
import BASE_URL from "../../url";
interface UserInfoResponse {
  username: string | undefined;
  userId: string | undefined;
  profileImg: string | null | undefined;
  backgroundImg: string | null | undefined;
  profileDescription: string | undefined;
  socialOnly: boolean;
}
interface UserPasswordChange {
  currentPassword: string;
  changePassword: string;
  changePasswordConfirm: string;
  userType: string | undefined;
}
interface UserFindPasswordAndChange {
  email: string;
  changePassword: string;
}
interface UserAlaramClickProp {
  email: string;
}
interface DeleteAlarmProps {
  deleteId: string;
  owner: string;
}
export const userTokenInspect = async () => {
  return await axios
    .get(`${BASE_URL}/token-inspect`, {
      withCredentials: true,
    })
    .then((result) => result.data);
};

export const userLogout = async () => {
  return await axios.post(
    `${BASE_URL}/userLogout`,
    {
      data: {},
    },
    { withCredentials: true }
  );
};

export const getCoinValue = async () => {
  return await axios
    .get(`${BASE_URL}/users/getCoin`, {
      withCredentials: true,
    })
    .then((result) => result.data);
};

export const getAlarmsState = async () => {
  return await axios
    .get(`${BASE_URL}/users/alarms-state`, {
      withCredentials: true,
    })
    .then((result) => result.data);
};
export const postEditProfile = async (
  formData: FormData
): Promise<AxiosResponse<UserInfoResponse>> => {
  return await axios({
    url: `${BASE_URL}/users/edit-profile`,
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },

    data: formData,
  });
};

export const postChangePassword = async (data: UserPasswordChange) => {
  return await axios({
    url: `${BASE_URL}/users/change-password`,
    method: "POST",
    withCredentials: true,
    data,
  });
};

export const postPasswordFindAndChange = async (
  data: UserFindPasswordAndChange
) => {
  return await axios({
    url: `${BASE_URL}/find-and-change`,
    method: "POST",
    withCredentials: true,
    data,
  });
};

export const postAlarmsClick = async (email: UserAlaramClickProp) => {
  return await axios({
    url: `${BASE_URL}/users/alram-click`,
    method: "POST",
    data: email,
  });
};
export const postMessageClick = async (email: UserAlaramClickProp) => {
  return await axios({
    url: `${BASE_URL}/users/message-click`,
    method: "POST",
    data: email,
  });
};
export const getAlarms = async () => {
  return await axios({
    url: `${BASE_URL}/users/get-alarms`,
    method: "GET",
    withCredentials: true,
  })
    .then((result) => result.data)
    .catch((error) => error.message);
};

export const postAlarmDelete = async ({
  deleteId,
  owner,
}: DeleteAlarmProps) => {
  return await axios({
    url: `${BASE_URL}/users/delete-alarm`,
    method: "POST",
    data: { deleteId, owner },
  });
};
