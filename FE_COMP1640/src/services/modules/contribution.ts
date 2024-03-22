/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
import { IUploadContribution } from "../../types/contribution.type";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
   contribute: (data: IUploadContribution) => {
      console.log(typeof data.uploadData);

      return axios.post(ENDPOINTS.CONTRIBUTION, data.uploadData, {
         headers: {
            Authorization: `Bearer ${data.token}`,
         },
      });
   },
};
