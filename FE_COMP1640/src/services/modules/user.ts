/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { ILogin, IRegister } from "../../types/user.type";
import { IParamsAxios } from "../../types/filter.type";

const userToken = sessionStorage.getItem("user-token");

export default {
   loginToGetToken: async (data: ILogin) => {
      return await axios.post(ENDPOINTS.LOGIN, data);
   },
   register: (data: IRegister) => {
      return axios.post(ENDPOINTS.REGISTER, data);
   },
   getUserList: async (params: IParamsAxios) => {
      return await axios.get(ENDPOINTS.USER.ALL, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
         params,
      });
   },
};
