const PARAMETER = {
   CONTRIBUTION_FILTER: ":filter",
   CONTRIBUTION_ID: ":id",
   CONTRIBUTION_SLUG: ":slug",
};

const PATHS = {
   HOME: {
      IDENTITY: "home",
   },
   AUTH: {
      IDENTIFY: "auth",
      LOGIN: "login",
      REGISTER: "register",
   },
   CONTRIBUTION: {
      IDENTIFY: "contribution",
      DETAIL: `${PARAMETER.CONTRIBUTION_SLUG}`,
   },
};

export { PATHS, PARAMETER };
