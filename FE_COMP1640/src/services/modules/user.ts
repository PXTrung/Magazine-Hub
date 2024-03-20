/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
   loginToGetToken: (data: object) => {
      return axios.post(ENDPOINTS.LOGIN, data);
   },
   register: (data: object) => {
      return axios.post(ENDPOINTS.REGISTER, data);
   },
};
