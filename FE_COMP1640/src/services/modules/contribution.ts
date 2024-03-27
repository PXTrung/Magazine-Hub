/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { IUploadContribution } from "../../types/contribution.type";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
   contribute: (data: IUploadContribution) => {
      return axios.post(ENDPOINTS.CONTRIBUTION.ALL, data.uploadData, {
         headers: {
            Authorization: `Bearer ${data.token}`,
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
         params: { filter: filter },
      });
   },
};
