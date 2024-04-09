import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";
import { ICreatePeriod, IUpdatePeriod } from "../../types/period.type";

const userToken = sessionStorage.getItem("user-token");

export default {
    getPeriod: async() => {
        return await axios.get(ENDPOINTS.PERIOD.ALL);
    },
    createPeriod: async(data: ICreatePeriod) => {
        return await axios.post(ENDPOINTS.PERIOD.ALL, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        })
    },
    updatePeriod: async(data: IUpdatePeriod) => {
        return await axios.put(ENDPOINTS.PERIOD.BY_ID, data, {
            headers: {
                Authorization: `Bearer ${userToken}`,
            }
        })
    }
}