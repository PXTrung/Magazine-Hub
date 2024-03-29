import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PATHS } from "../constants/path";
import authUtils from "../utils/auth";
import Loading from "../components/loading/Loading";
import useRedux from "../hooks/useRedux";

type ProtectedRouteTypes = {
   component?: React.ComponentType;
   role?: string;
   backgroundImage?: string;
};

function ProtectedRoute({
   component: RouteComponent,
   role,
}: ProtectedRouteTypes) {
   const { appSelector } = useRedux();
   const location = useLocation();
   const navigate = useNavigate();
   const { userInfor, isLogin } = appSelector((state) => state.auth);

   useEffect(() => {
      if (!isLogin)
         navigate(`/${PATHS.AUTH.IDENTITY}`, {
            state: {
               from: location.pathname,
            },
         });
   }, [navigate, location.pathname, isLogin]);

   if (!userInfor?.role) {
      return <Loading />;
   }

   if (role && userInfor?.role) {
      const regex = new RegExp(`^${role}$`);

      if (!regex.test(userInfor?.role)) {
         return (
            <Navigate to={{ pathname: `/${PATHS.HOME.IDENTITY}` }} replace />
         );
      }
   }

   //@ts-ignore
   return <RouteComponent />;
}

export default ProtectedRoute;
