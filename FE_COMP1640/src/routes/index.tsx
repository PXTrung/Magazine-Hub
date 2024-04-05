import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PARAMETER, PATHS } from "../constants/path";
import Loading from "../components/loading/Loading";
import LandingPage from "../pages/landing/LandingPage";
import ProtectedRoute from "./ProtectedRoute";
import UploadForm from "../pages/contributor/UploadForm";

// Authentication
const Authentication = lazy(() => import("../pages/auth/Authentication"));
const LoginForm = lazy(() => import("../pages/auth/components/LoginForm"));
const RegisterForm = lazy(
  () => import("../pages/auth/components/RegisterForm")
);

// Home layout
const Home = lazy(() => import("../layouts/Home/index"));

// Contribution
const ContributionDetail = lazy(
  () => import("../components/Contribution/ContributionDetail")
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
  () => import("../pages/contributor/ContributorDetailPage")
);

const PeriodSelector = lazy(
  () => import("../pages/contributor/PeriodSelector")
);

const ContributionsByFaculty = lazy(
  () => import("../pages//contributor/ContributionsByFaculty")
);

// Coordinator
const CoordinatorPage = lazy(() => import("../pages/coordinator/Coordinator"));

// Manager
const ManagerPage = lazy(() => import("../pages/manager/Manager"));

// Admin
const AdminPage = lazy(() => import("../pages/admin/Admin"));
const UserManage = lazy(() => import("../pages/admin/UserManage"));
const PeriodPage = lazy(() => import("../pages/admin/Period"));

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
    {
      path: PATHS.AUTH.REGISTER,
      element: <LazyLoadingComponent component={RegisterForm} />,
    },
  ],
};

const contributionRoute = {
  path: PATHS.CONTRIBUTION.IDENTITY,
  element: <LazyLoadingComponent component={Home} />,
  children: [
    {
      path: PATHS.CONTRIBUTION.DETAIL,
      element: <LazyLoadingComponent component={ContributionDetail} />,
    },
    {
      path: `${PATHS.CONTRIBUTION.CATEGORY}/${PARAMETER.CATEGORY}`,
      element: <LazyLoadingComponent component={ContributionCategory} />,
    },
  ],
};

const contributorRoute = {
  path: "contributor",
  // element: <></>,
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
      path: `${PATHS.CONTRIBUTION.CREATE}`,
      element: <LazyLoadingComponent component={ContributionCreate} />,
    },
  ],
};

const coordinatorRoute = {
  path: "coordinator",
  children: [
    {
      path: PATHS.COORDINATOR.IDENTITY,
      element: <LazyLoadingComponent component={CoordinatorPage} />,
    },
  ],
};

const managerRoute = {
  path: "manager",
  children: [
    {
      path: PATHS.COORDINATOR.IDENTITY,
      element: <LazyLoadingComponent component={ManagerPage} />,
    },
  ],
};

const adminRoute = {
  path: "admin",
  children: [
    {
      path: PATHS.ADMIN.MANAGE_USER,
      element: <LazyLoadingComponent component={UserManage} />,
    },
    {
      path: PATHS.ADMIN.PERIOD,
      element: <LazyLoadingComponent component={PeriodPage} />,
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
      children: [
        {
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
              element: (
                <LazyLoadingComponent component={ContributorDetailPage} />
              ),
            },
            {
              path: `${PATHS.CONTRIBUTION.CREATE}/${PATHS.CONTRIBUTION.DETAIL}`,
              element: <LazyLoadingComponent component={ContributionCreate} />,
            },
            {
              path: PATHS.CONTRIBUTION.CREATE,
              element: <LazyLoadingComponent component={PeriodSelector} />,
            },
          ],
        },
      ],
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
