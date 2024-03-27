import { Suspense, lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { PATHS } from "../constants/path";
import Loading from "../components/loading/Loading";
import LandingPage from "../pages/landing/LandingPage";

// Authentication
const Authentication = lazy(() => import("../pages/auth/Authentication"));
const LoginForm = lazy(() => import("../pages/auth/components/LoginForm"));
const RegisterForm = lazy(
   () => import("../pages/auth/components/RegisterForm"),
);
const Home = lazy(() => import("../layouts/Home/index"));
const Contribution = lazy(() => import("../pages/contribution/Contribution"));
const ContributionDetail = lazy(
   () => import("../pages/contribution/ContributionDetail"),
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
   path: PATHS.AUTH.IDENTIFY,
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
   path: PATHS.CONTRIBUTION.IDENTIFY,
   element: <LazyLoadingComponent component={Contribution} />,
   children: [
      {
         path: PATHS.CONTRIBUTION.DETAIL,
         element: <LazyLoadingComponent component={ContributionDetail} />,
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
               path: PATHS.HOME.IDENTITY,
               element: <LandingPage />,
            },
            // {
            //    path: PATHS.CONTRIBUTION.IDENTIFY,
            //    element: <Contribution />,
            // },
            contributionRoute,
         ],
      },
   ]);
}
