/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { ILogin } from "../../types/user.type";

export default {
   loginToGetToken: async (data: ILogin) => {
      return await axios.post(ENDPOINTS.LOGIN, data);
   },
   register: (data: object) => {
      return axios.post(ENDPOINTS.REGISTER, data);
   },
};
