import axios from "axios";
import { ENDPOINTS } from "../../constants/endpoint";

export default {
    getPeriod: async() => {
        return axios.get(ENDPOINTS.PERIOD.ALL);
    }
}