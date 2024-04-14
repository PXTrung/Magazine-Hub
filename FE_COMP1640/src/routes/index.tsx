import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PARAMETER, PATHS } from "../constants/path";
import Loading from "../components/loading/Loading";
import LandingPage from "../pages/landing/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import UploadForm from "../pages/contributor/UploadForm";
import { elements } from "chart.js";

// Authentication
const Authentication = lazy(() => import("../pages/auth/Authentication"));
const LoginForm = lazy(() => import("../pages/auth/components/LoginForm"));

// Home layout
const Home = lazy(() => import("../layouts/Home/index"));

// Contribution
const PublicContributionDetail = lazy(
  () => import("../components/Contribution/PublicContributionDetail")
);
const ContributionCategory = lazy(
  () => import("../pages/contribution/ContributionCategory")
);
const ContributionCreate = lazy(
  () => import("../pages/contributor/UploadForm")
);

// Contributor
const ContributorPage = lazy(
  () => import("../pages/contributor/ContributorPage")
);

const ContributorDetailPage = lazy(
  () =>
    import(
      "../pages/contributor/components/ContributionDetail/UpdateContribution"
    )
);

const PeriodSelector = lazy(() => import("../pages/contributor/PeriodList"));

const ContributionsByFaculty = lazy(
  () => import("../pages//contributor/ContributionsByFaculty")
);

const ContributionDetail = lazy(
  () => import("../components/Contribution/ContributionDetail")
);
// Coordinator
const CoordinatorPage = lazy(() => import("../pages/coordinator/Coordinator"));
const CoordinatorDetailPage = lazy(
  () =>
    import(
      "../pages/coordinator/components/ContributionDetail/ViewContribution"
    )
);
const CreateContributor = lazy(
  () => import("../pages/coordinator/CreateContributor")
);

// Manager
const ManagerPage = lazy(() => import("../pages/manager/Manager"));
const ManagerDetailPage = lazy(
  () =>
    import("../pages/manager/components/ContributionDetail/ViewContribution")
);
const CreateCoordinator = lazy(
  () => import("../pages/manager/CreateCoordinator")
);
const ManagerDashboard = lazy(
   () => import("../pages/manager/components/Dashboard/Dashboard"),
);

// Admin
const UserManage = lazy(() => import("../pages/admin/UserTable/UserManage"));
const PeriodPage = lazy(() => import("../pages/admin/Period/Period"));
const PeriodDetail = lazy(() => import("../pages/admin/Period/PeriodDetail"));

// Layout
const RoleLayout = lazy(() => import("../layouts/RolePage/index"));

type LoadComponentProps = {
  component: React.LazyExoticComponent<() => JSX.Element>;
};

const LazyLoadingComponent = ({ component: Component }: LoadComponentProps) => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </div>
  );
};

const authRoute = {
  path: PATHS.AUTH.IDENTITY,
  element: <LazyLoadingComponent component={Authentication} />,
  children: [
    {
      path: "",
      element: <Navigate to={`${PATHS.AUTH.LOGIN}`} replace />,
    },

    {
      path: PATHS.AUTH.LOGIN,
      element: <LazyLoadingComponent component={LoginForm} />,
    },
  ],
};

const contributionRoute = {
  path: PATHS.CONTRIBUTION.IDENTITY,
  element: <LazyLoadingComponent component={Home} />,
  children: [
    {
      path: PATHS.CONTRIBUTION.DETAIL,
      element: <LazyLoadingComponent component={PublicContributionDetail} />,
    },
    {
      path: `${PATHS.CONTRIBUTION.CATEGORY}/${PARAMETER.CATEGORY}`,
      element: <LazyLoadingComponent component={ContributionCategory} />,
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
      element: <LazyLoadingComponent component={ContributorPage} />,
    },
    {
      path: `${PATHS.CONTRIBUTION.IDENTITY}/${PATHS.CONTRIBUTION.DETAIL}`,
      element: <LazyLoadingComponent component={ContributorDetailPage} />,
    },
    {
      path: `${PATHS.CONTRIBUTION.CREATE}/${PATHS.CONTRIBUTION.DETAIL}`,
      element: <LazyLoadingComponent component={ContributionCreate} />,
    },
    {
      path: PATHS.CONTRIBUTION.CREATE,
      element: <LazyLoadingComponent component={PeriodSelector} />,
    },
    {
      path: PATHS.CONTRIBUTION.FACULTY,
      element: <LazyLoadingComponent component={ContributionsByFaculty} />,
    },
    {
      path: `${PATHS.CONTRIBUTION.FACULTY}/${PATHS.CONTRIBUTION.DETAIL}`,
      element: <LazyLoadingComponent component={ContributionDetail} />,
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
      element: <LazyLoadingComponent component={CoordinatorPage} />,
    },
    {
      path: `${PATHS.CONTRIBUTION.IDENTITY}/${PATHS.CONTRIBUTION.DETAIL}`,
      element: <LazyLoadingComponent component={CoordinatorDetailPage} />,
    },
    {
      path: PATHS.COORDINATOR.CREATE_ACCOUNT,
      element: <LazyLoadingComponent component={CreateContributor} />,
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
      element: <LazyLoadingComponent component={ManagerPage} />,
    },
    {
      path: `${PATHS.CONTRIBUTION.IDENTITY}/${PATHS.CONTRIBUTION.DETAIL}`,
      element: <LazyLoadingComponent component={ManagerDetailPage} />,
    },
    {
      path: PATHS.MANAGER.CREATE_ACCOUNT,
      element: <LazyLoadingComponent component={CreateCoordinator} />,
    },
      {
         path: `${PATHS.DASHBOARD.INDENTITY}`,
         element: <LazyLoadingComponent component={ManagerDashboard} />,
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
         element: <LazyLoadingComponent component={UserManage} />,
      },
      {
         path: PATHS.ADMIN.PERIOD,
         element: <LazyLoadingComponent component={PeriodPage} />,
      },
      {
         path: `${PATHS.ADMIN.PERIOD}/${PATHS.ADMIN.DETAIL}`,
         element: <LazyLoadingComponent component={PeriodDetail} />,
      },
   ],
};

export default function AllRoutes() {
  return useRoutes([
    authRoute,
    contributionRoute,
    {
      path: "/",
      element: <LazyLoadingComponent component={Home} />,
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
