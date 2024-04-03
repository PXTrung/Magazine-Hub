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
   },
};

export { PATHS, PARAMETER };
