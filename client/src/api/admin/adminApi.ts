import axios from "axios";
import BASE_URL from "../../url";

export const CreatorRegisterList = async () => {
  return await axios
    .get(`${BASE_URL}/admin/creator-register`, { withCredentials: true })
    .then((result) => result.data);
};
