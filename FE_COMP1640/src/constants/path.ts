const PARAMETER = {
   ID: ":id",
   CATEGORY: ":category",
   CONTRIBUTION_FILTER: ":filter",
   CONTRIBUTION_SLUG: "",
};

const PATHS = {
   HOME: {
      IDENTITY: "home",
   },
   AUTH: {
      IDENTITY: "auth",
      LOGIN: "login",
      REGISTER: "register",
      CHANGE_PASS: "changePassword",
      SEND_OTP: "verifyEmail",
      RESET_PASS: "resetPassword",
   },
   DASHBOARD: {
      INDENTITY: "dashboard",
   },
   CONTRIBUTION: {
      IDENTITY: "contribution",
      DETAIL: `${PARAMETER.ID}`,
      CATEGORY: `category`,
      CREATE: "create",
      FACULTY: "faculty",
   },
   CONTRIBUTOR: {
      IDENTITY: "contributor",
   },
   COORDINATOR: {
      IDENTITY: "coordinator",
      CREATE_ACCOUNT: "createAccount",
   },
   MANAGER: {
      IDENTITY: "manager",
      CREATE_ACCOUNT: "createAccount",
   },
   ADMIN: {
      IDENTITY: "admin",
      MANAGE_USER: "user",
      PERIOD: "period",
      DETAIL: `${PARAMETER.ID}`,
      DASHBOARD: "dashboard",
      CREATE_ALL: "createAll",
   },
};

export { PATHS, PARAMETER };
