import axios from "axios"

export default {
    getPeriod: async() => {
        return axios.get("https://localhost:7009/api/Periods");
    }
}