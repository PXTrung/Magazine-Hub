import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const RolePage = () => {
   return (
      <div>
         <Suspense fallback={<Loading />}>
            <Outlet />
         </Suspense>
      </div>
   );
};

export default RolePage;
