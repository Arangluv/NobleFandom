import axios from "axios";
import BASE_URL from "../../url";

export const userTokenInspect = async () => {
  return await axios
    .get(`${BASE_URL}/token-inspect`, {
      withCredentials: true,
    })
    .then((result) => result.data);
};
