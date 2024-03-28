/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
   getFaculty: () => {
      return axios.get(ENDPOINTS.FALCUTY);
   },
};
