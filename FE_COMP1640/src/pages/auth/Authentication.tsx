import { Suspense, useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { PATHS } from "../../constants/path";

const loading = () => <Loading />;

const variants = {
   [`/auth/${PATHS.AUTH.REGISTER}`]: {
      to: `/auth/${PATHS.AUTH.LOGIN}`,
      linkText: "Login",
      text: "Have an account?",
   },
   [`/auth/${PATHS.AUTH.LOGIN}`]: {
      to: `/auth/${PATHS.AUTH.REGISTER}`,
      linkText: "Register now",
      text: "Do not have account yet?",
   },
};

const Authentication = () => {
   const [isLoading, setIsLoading] = useState(false);

   const location = useLocation();

   useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
         setIsLoading(false);
      }, 1000);
   }, [location.pathname]);

   const variant = useMemo(() => location.pathname, [location.pathname]);

   return (
      <>
         {isLoading ? (
            <Loading />
         ) : (
            <div className="min-w-screen min-h-screen bg-slate-100 flex justify-center items-center">
               <div className="relative bg-white my-5 p-8 rounded shadow-xl w-[420px]">
                  <Suspense fallback={loading()}>
                     <Outlet />
                  </Suspense>
                  <div className="flex flex-col gap-8 justify-center items-center text-base mt-8 px-2 text-gray-500">
                     <div className="flex gap-2">
                        <div>{variants[variant]?.text || ""}</div>
                        <Link
                           to={variants[variant]?.to || ""}
                           replace
                           className="cursor-pointer text-blue-500 hover:underline"
                        >
                           {variants[variant]?.linkText || ""}
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default Authentication;
