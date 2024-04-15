/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { ICreateAllAccount, ICreateContributor, ICreateCoordinator, ILogin, IChangePassword, ISendOTP, IResetPassword } from "../../types/user.type";
import { IParamsAxios } from "../../types/filter.type";



export default {
   loginToGetToken: async (data: ILogin) => {
      return await axios.post(ENDPOINTS.LOGIN, data);
   },
   getUserList: async (params: IParamsAxios) => {
      const userToken = sessionStorage.getItem("user-token");

      return await axios.get(ENDPOINTS.USER.ALL, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
         params,
      });
   },
   createContributor: (data: ICreateContributor) => {
      const userToken = sessionStorage.getItem("user-token");

      return axios.post(ENDPOINTS.CREATE_CONTRIBUTOR_ACCOUNT, data, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      });
   },
   createCoordinator: (data: ICreateCoordinator) => {
      const userToken = sessionStorage.getItem("user-token");

      return axios.post(ENDPOINTS.CREATE_COORDINATOR_ACCOUNT, data, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      });
   },
   changePassword: (data: IChangePassword) => {
      return axios.post(ENDPOINTS.RESET_PASS, data);
   },
   createAllAccount: (data: ICreateAllAccount) => {
      const userToken = sessionStorage.getItem("user-token");

      return axios.post(ENDPOINTS.CREATE_ALL_ACCOUNT, data, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userToken}`,
         }
      })
   },
   sendOTP: (data: ISendOTP) => {
      return axios.post(ENDPOINTS.SENT_OTP, data);
   },
   resetPassword: (data: IResetPassword) => {
      return axios.post(ENDPOINTS.CHANGE_PASS, data);
   },
};
