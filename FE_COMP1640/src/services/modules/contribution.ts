/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
   contribute: async (data: FormData) => {
      return await axios.post(ENDPOINTS.CONTRIBUTION.ALL, data, {
         headers: {
            // Authorization: `Bearer ${data.token}`,
         },
      });
   },
   getContributionByStatus: (filter: string) => {
      return axios.get(ENDPOINTS.CONTRIBUTION.FILTER, {
         headers: {
            Authorization: `Bearer ${sessionStorage.getItem(
               "currentUserToken",
            )}`,
         },
         params: { filters: filter },
      });
   },
   getContributionById: async (id: string) => {
      return await axios.get(`${ENDPOINTS.CONTRIBUTION.ALL}/${id}`);
   },
};
