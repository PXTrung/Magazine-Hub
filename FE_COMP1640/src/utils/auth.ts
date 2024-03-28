import { jwtDecode } from "jwt-decode";
import { IUserInformation } from "../types/user.type";

/* eslint-disable import/no-anonymous-default-export */
const TOKEN_KEY = "user-token";

export default {
   getSessionToken(): string | null {
      let token = sessionStorage.getItem(TOKEN_KEY);
      return token ? token : null;
   },
   setSessionToken(token?: string) {
      if (token) {
         sessionStorage.setItem(TOKEN_KEY, token);
      } else {
         sessionStorage.removeItem(TOKEN_KEY);
      }
   },
   decodeToken(token?: string): IUserInformation | null {
      if (token) {
         let userData: any = jwtDecode(token);

         return {
            firstName:
               userData[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
               ],
            lastName:
               userData[
                  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname"
               ],
            role: userData[
               "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
            ],
            email: userData[
               "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"
            ],
         };
      } else return null;
   },
};
