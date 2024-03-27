import React, { Suspense } from "react";
import UploadForm from "./components/UploadForm";
import Loading from "../../components/loading/Loading";
import { Outlet } from "react-router-dom";
const loading = () => <Loading />;

const Contribution = () => {
   return (
      <>
         <div>Contribution</div>
         {/* <UploadForm /> */}
         <Suspense fallback={loading()}>
            <Outlet />
         </Suspense>
      </>
   );
};

export default Contribution;
