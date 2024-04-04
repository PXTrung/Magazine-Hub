import { PARAMETER } from "./path";

// Define the base URL for the API
const API_BASE_URL = "http://localhost:5001/api/";

// Define functions to construct endpoint URLs
function constructEndpoint(endpoint: string) {
   return API_BASE_URL + endpoint;
}

// Define the endpoints
export const ENDPOINTS = {
   LOGIN: constructEndpoint("Auth/Login"),
   REGISTER: constructEndpoint("Auth/Register"),
   FALCUTY: constructEndpoint("Falcuties"),
   CONTRIBUTION: {
      ALL: constructEndpoint(`Contributions`),
      FILTER: constructEndpoint(
         `Contributions?${PARAMETER.CONTRIBUTION_FILTER}`,
      ),
      BY_ID: constructEndpoint(`Contributions/${PARAMETER.ID}`),
   },
   FEEDBACK: {
      ALL: constructEndpoint(`Feedbacks`),
   } 
};
