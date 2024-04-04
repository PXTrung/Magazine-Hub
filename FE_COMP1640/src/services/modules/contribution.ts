/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";

const userToken = sessionStorage.getItem("user-token");

export interface IParams {
   filters?: string;
   sorts?: string;
   page?: number;
   pageSize?: number;
   createByEmail?: string
}

export const generateParams = (
   filters?: string,
   sorts?: string,
   page?: number,
   pageSize?: number,
) => {
   return {
      filters: filters || "",
      sorts: sorts || "",
      page: page || 1,
      pageSize: pageSize || 10,
   };
};

export default {
   contribute: async (data: FormData) => {
      return await axios.post(ENDPOINTS.CONTRIBUTION.ALL, data, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
      });
   },
   getContributionByStatus: (filter: string) => {
      return axios.get(ENDPOINTS.CONTRIBUTION.FILTER, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
         params: { filters: filter },
      });
   },
   getContributionById: async (id: string) => {
      return await axios.get(`${ENDPOINTS.CONTRIBUTION.ALL}/${id}`);
   },
   getContributionByPagination: async (endpoint: string) => {
      return await axios.get(endpoint);
   },
   getContributionList: async (params: IParams) => {
      return await axios.get(ENDPOINTS.CONTRIBUTION.ALL, {
         params,
      });
   },
   getContributionListWithToken: async (params: IParams) => {
      return await axios.get(ENDPOINTS.CONTRIBUTION.ALL, {
         headers: {
            Authorization: `Bearer ${userToken}`,
         },
         params,
      });
   },
};
