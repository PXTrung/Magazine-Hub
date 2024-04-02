import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../../components/loading/Loading";

const RolePage = () => {
   return (
      <div>
         <div>
            <Suspense fallback={<Loading />}>
               <Outlet />
            </Suspense>
         </div>
      </div>
   );
};

export default RolePage;
