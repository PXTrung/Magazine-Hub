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
   },
   MANAGER: {
      IDENTITY: "manager",
   },
   ADMIN: {
      IDENTITY: "admin",
      MANAGE_USER: "user",
      PERIOD: "period",
      DETAIL: `${PARAMETER.ID}`
   },
};

export { PATHS, PARAMETER };
