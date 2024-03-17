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
         element: <Navigate to={`${PATHS.AUTH.REGISTER}`} replace />,
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

export default function AllRoutes() {
   return useRoutes([
      authRoute,
      {
         path: "/",
         element: <LandingPage />,
      },
   ]);
}
