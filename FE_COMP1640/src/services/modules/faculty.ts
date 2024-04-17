/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { ICreateFaculty } from "../../types/faculty.type";

export default {
   getFaculty: () => {
      return axios.get(ENDPOINTS.FALCUTY);
   },
   createFaculty: (data: ICreateFaculty) => {
      const userToken = sessionStorage.getItem("user-token");
      return axios.post(ENDPOINTS.FALCUTY, data, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         }
      })
   }
};

