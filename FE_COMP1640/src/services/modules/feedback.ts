import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
    getFeedback: async () => {
        return axios.get(`https://localhost:7009/api/Feedbacks`, {
            headers: {
                Authorization: `bearer ${sessionStorage.getItem("user-token")}`,
            }
        });
    },
    getFeedBackByContributionId: async(filter: string) => {
        return axios.get(`https://localhost:7009/api/Feedbacks`, {
            headers: {
                Authorization: `bearer ${sessionStorage.getItem("user-token")}`,
            },
            params: {filters: filter}
        });
    },
}