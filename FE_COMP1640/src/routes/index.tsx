import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PARAMETER, PATHS } from "../constants/path";
import Loading from "../components/loading/Loading";
import LandingPage from "../pages/landing/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicContributionDetail from "../components/Contribution/PublicContributionDetail";
// Authentication
import Authentication from "../pages/auth/Authentication";
import LoginForm from "../pages/auth/components/LoginForm";
import ChangePassword from "../pages/auth/components/ChangePassword";

// Home layout
import Home from "../layouts/Home/index";

// Contribution
import ContributionCategory from "../pages/contribution/ContributionCategory";
import ContributionCreate from "../pages/contributor/UploadForm";

// Contributor
import ContributorPage from "../pages/contributor/ContributorPage";
import ContributorDetailPage from "../pages/contributor/components/ContributionDetail/UpdateContribution";
import PeriodSelector from "../pages/contributor/PeriodList";
import ContributionsByFaculty from "../pages//contributor/ContributionsByFaculty";
import ContributionDetail from "../components/Contribution/ContributionDetail";

// Coordinator
import CoordinatorPage from "../pages/coordinator/Coordinator";
import CoordinatorDetailPage from "../pages/coordinator/components/ContributionDetail/ViewContribution";
import CreateContributor from "../pages/coordinator/CreateContributor";
import CoordinatorDashboard from "../pages/coordinator/components/Dashboard/Dashboard";

// Manager
import ManagerPage from "../pages/manager/Manager";
import ManagerDetailPage from "../pages/manager/components/ContributionDetail/ViewContribution";
import CreateCoordinator from "../pages/manager/CreateCoordinator";
import ManagerDashboard from "../pages/manager/components/Dashboard/Dashboard";

// Admin
import UserManage from "../pages/admin/UserTable/UserManage";
import PeriodPage from "../pages/admin/Period/Period";
import PeriodDetail from "../pages/admin/Period/PeriodDetail";
import CreateAllAccount from "../pages/admin/CreateAllAccount";

// Layout
import RoleLayout from "../layouts/RolePage/index";

const authRoute = {
   path: PATHS.AUTH.IDENTITY,
   element: <Authentication />,
   children: [
      {
         path: "",
         element: <Navigate to={`${PATHS.AUTH.LOGIN}`} replace />,
      },

      {
         path: PATHS.AUTH.LOGIN,
         element: <LoginForm />,
      },

      {
         path: PATHS.AUTH.CHANGE_PASS,
         element: <ChangePassword />,
      },
   ],
};

const contributionRoute = {
   path: PATHS.CONTRIBUTION.IDENTITY,
   element: <Home />,
   children: [
      {
         path: PATHS.CONTRIBUTION.DETAIL,
         element: <PublicContributionDetail />,
      },
      {
         path: `${PATHS.CONTRIBUTION.CATEGORY}/${PARAMETER.CATEGORY}`,
         element: <ContributionCategory />,
      },
   ],
};

const contributorRoute = {
   path: PATHS.CONTRIBUTOR.IDENTITY,
   children: [
      {
         path: "",
         element: <Navigate to={`${PATHS.CONTRIBUTION.IDENTITY}`} />,
      },
      {
         index: true,
         path: PATHS.CONTRIBUTION.IDENTITY,
         element: <ContributorPage />,
      },
      {
         path: `${PATHS.CONTRIBUTION.IDENTITY}/${PATHS.CONTRIBUTION.DETAIL}`,
         element: <ContributorDetailPage />,
      },
      {
         path: `${PATHS.CONTRIBUTION.CREATE}/${PATHS.CONTRIBUTION.DETAIL}`,
         element: <ContributionCreate />,
      },
      {
         path: PATHS.CONTRIBUTION.CREATE,
         element: <PeriodSelector />,
      },
      {
         path: PATHS.CONTRIBUTION.FACULTY,
         element: <ContributionsByFaculty />,
      },
      {
         path: `${PATHS.CONTRIBUTION.FACULTY}/${PATHS.CONTRIBUTION.DETAIL}`,
         element: <ContributionDetail />,
      },
   ],
};

const coordinatorRoute = {
   path: PATHS.COORDINATOR.IDENTITY,
   children: [
      {
         path: "",
         element: <Navigate to={`${PATHS.CONTRIBUTION.IDENTITY}`} />,
      },
      {
         path: PATHS.CONTRIBUTION.IDENTITY,
         element: <CoordinatorPage />,
      },
      {
         path: `${PATHS.CONTRIBUTION.IDENTITY}/${PATHS.CONTRIBUTION.DETAIL}`,
         element: <CoordinatorDetailPage />,
      },
      {
         path: PATHS.COORDINATOR.CREATE_ACCOUNT,
         element: <CreateContributor />,
      },
      {
         path: PATHS.DASHBOARD.INDENTITY,
         element: <CoordinatorDashboard />,
      },
   ],
};

const managerRoute = {
   path: PATHS.MANAGER.IDENTITY,
   children: [
      {
         path: "",
         element: <Navigate to={`${PATHS.CONTRIBUTION.IDENTITY}`} />,
      },
      {
         path: PATHS.CONTRIBUTION.IDENTITY,
         element: <ManagerPage />,
      },
      {
         path: `${PATHS.CONTRIBUTION.IDENTITY}/${PATHS.CONTRIBUTION.DETAIL}`,
         element: <ManagerDetailPage />,
      },
      {
         path: PATHS.MANAGER.CREATE_ACCOUNT,
         element: <CreateCoordinator />,
      },
      {
         path: `${PATHS.DASHBOARD.INDENTITY}`,
         element: <ManagerDashboard />,
      },
   ],
};

const adminRoute = {
   path: PATHS.ADMIN.IDENTITY,
   children: [
      {
         path: "",
         element: <Navigate to={`${PATHS.ADMIN.MANAGE_USER}`} />,
      },
      {
         path: PATHS.ADMIN.MANAGE_USER,
         element: <UserManage />,
      },
      {
         path: PATHS.ADMIN.PERIOD,
         element: <PeriodPage />,
      },
      {
         path: `${PATHS.ADMIN.PERIOD}/${PATHS.ADMIN.DETAIL}`,
         element: <PeriodDetail />,
      },
      {
         path: PATHS.ADMIN.CREATE_ALL,
         element: <CreateAllAccount />,
      },
   ],
};

export default function AllRoutes() {
   return useRoutes([
      authRoute,
      contributionRoute,
      {
         path: "/",
         element: <Home />,
         children: [
            {
               path: "/",
               element: <Navigate to={`${PATHS.HOME.IDENTITY}`} replace />,
            },
            {
               path: PATHS.HOME.IDENTITY,
               element: <LandingPage />,
            },
         ],
      },
      {
         path: "/",
         element: <ProtectedRoute component={RoleLayout} role="Contributor" />,
         children: [contributorRoute],
      },
      {
         path: "/",
         element: <ProtectedRoute component={RoleLayout} role="Coordinator" />,
         children: [coordinatorRoute],
      },
      {
         path: "/",

         element: <ProtectedRoute component={RoleLayout} role="Manager" />,
         children: [managerRoute],
      },
      {
         path: "/",
         element: <ProtectedRoute component={RoleLayout} role="Admin" />,
         children: [adminRoute],
      },
   ]);
}
