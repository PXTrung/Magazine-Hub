/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { ICreateContributor, ICreateCoordinator, ILogin } from "../../types/user.type";
import { IParamsAxios } from "../../types/filter.type";

const userToken = sessionStorage.getItem("user-token");

export default {
   loginToGetToken: async (data: ILogin) => {
      return await axios.post(ENDPOINTS.LOGIN, data);
   },
   getUserList: async (params: IParamsAxios) => {
      return await axios.get(ENDPOINTS.USER.ALL, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
         params,
      });
   },
   createContributor: (data: ICreateContributor) => {
      return axios.post(ENDPOINTS.CREATE_CONTRIBUTOR_ACCOUNT, data, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      });
   },
   createCoordinator: (data: ICreateCoordinator) => {
      return axios.post(ENDPOINTS.CREATE_COORDINATOR_ACCOUNT, data, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      });
   }
};
