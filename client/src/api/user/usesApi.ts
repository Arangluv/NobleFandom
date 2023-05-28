import axios from "axios";
import BASE_URL from "../../url";

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
