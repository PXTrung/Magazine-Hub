import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PARAMETER, PATHS } from "../constants/path";
import Loading from "../components/loading/Loading";
import LandingPage from "../pages/landing/LandingPage";

// Authentication
const Authentication = lazy(() => import("../pages/auth/Authentication"));
const LoginForm = lazy(() => import("../pages/auth/components/LoginForm"));
const RegisterForm = lazy(
   () => import("../pages/auth/components/RegisterForm"),
);
const Home = lazy(() => import("../layouts/Home/index"));
const ContributionDetail = lazy(
   () => import("../pages/contribution/ContributionDetail"),
);
const ContributionCategory = lazy(
   () => import("../pages/contribution/ContributionCategory"),
);

type LoadComponentProps = {
   component: React.LazyExoticComponent<() => JSX.Element>;
};

const LazyLoadingComponent = ({ component: Component }: LoadComponentProps) => {
   return (
      <Suspense fallback={<Loading />}>
         <Component />
      </Suspense>
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

export default function AllRoutes() {
   return useRoutes([
      authRoute,
      contributionRoute,
      {
         path: "",
         element: <LazyLoadingComponent component={Home} />,
         children: [
            {
               path: "",
               element: <Navigate to={`${PATHS.HOME.IDENTITY}`} replace />,
            },
            {
               path: PATHS.HOME.IDENTITY,
               element: <LandingPage />,
            },
         ],
      },
   ]);
}
