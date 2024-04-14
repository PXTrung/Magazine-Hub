/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, startTransition, useEffect, useState } from "react";
import { Link, Navigate, Outlet, useSearchParams } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import useRedux from "../../hooks/useRedux";
import { getCurrentUser } from "../../redux/slices/authSlice";
import { getFaculty } from "../../redux/slices/facultySlice";
import Searchbar from "../../components/Searchbar";
import UserInformation from "../../pages/landing/components/UserInformation";
import { IUserInformation } from "../../types/user.type";
import { PATHS } from "../../constants/path";
import clsx from "clsx";

interface MenuItem {
   id: number;
   label: string;
   path: string;
}

interface Menu {
   [key: string]: MenuItem[];
}

const menu: Menu = {
   Contributor: [
      {
         id: 1,
         label: "My Contributions",
         path: `${PATHS.CONTRIBUTOR.IDENTITY}/${PATHS.CONTRIBUTION.IDENTITY}?page=1`,
      },
      {
         id: 2,
         label: "My Faculty",
         path: `${PATHS.CONTRIBUTOR.IDENTITY}/${PATHS.CONTRIBUTION.FACULTY}?page=1`,
      },
      {
         id: 3,
         label: "Contribute",
         path: `${PATHS.CONTRIBUTOR.IDENTITY}/${PATHS.CONTRIBUTION.CREATE}`,
      },
   ],
   Coordinator: [
      {
         id: 1,
         label: "Contributions",
         path: `${PATHS.COORDINATOR.IDENTITY}/${PATHS.CONTRIBUTION.IDENTITY}?page=1`,
      },
      {
         id: 2,
         label: "Dashboard",
         path: `${PATHS.COORDINATOR.IDENTITY}/${PATHS.ADMIN.DASHBOARD}`,
      },
      {
         id: 3,
         label: "Create Account",
         path: `${PATHS.COORDINATOR.IDENTITY}/${PATHS.COORDINATOR.CREATE_ACCOUNT}`,
      },
   ],
   Manager: [
      {
         id: 1,
         label: "Contributions",
         path: `${PATHS.MANAGER.IDENTITY}/${PATHS.CONTRIBUTION.IDENTITY}?page=1`,
      },
      {
         id: 2,
         label: "Dashboard",
         path: `${PATHS.MANAGER.IDENTITY}/${PATHS.ADMIN.DASHBOARD}`,
      },
      {
         id: 3,
         label: "Create Account",
         path: `${PATHS.MANAGER.IDENTITY}/${PATHS.MANAGER.CREATE_ACCOUNT}`,
      },
   ],
   Admin: [
      {
         id: 1,
         label: "User",
         path: `${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.MANAGE_USER}?page=1`,
      },
      {
         id: 2,
         label: "Period",
         path: `${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.PERIOD}`,
      },
      {
         id: 3,
         label: "Dashboard",
         path: `${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.DASHBOARD}`,
      },
   ],
};

const RolePage = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const { dispatch, appSelector } = useRedux();
   const { userInfor } = appSelector((state) => state.auth);
   const [isActive, setIsActive] = useState<number>(1);

   const handleOnclick = (id: number) => {
      setIsActive(id);
   };

   const setParams = (key: string, value: string) => {
      setSearchParams((prevParams) => {
         if (value === null || value === "") {
            prevParams.delete(key);
         } else {
            prevParams.set(key, value);
         }
         return prevParams;
      });
   };

   useEffect(() => {
      dispatch(getCurrentUser());
      dispatch(getFaculty());
   }, [dispatch]);

   return userInfor ? (
      <div className="flex flex-row justify-center items-center bg-slate-100">
         {/* Side bar */}
         <div className="w-52 min-h-screen fixed z-50 top-0 left-0 bg-white border-r border-slate-100 flex flex-col items-center justify-start pt-5">
            <Link
               key={"home"}
               to={`/${PATHS.HOME.IDENTITY}`}
               className="w-1/4 flex justify-center mb-10"
            >
               <img
                  src="./assets/images/logo.jpg"
                  alt="LOGO"
                  className="h-full w-full"
               />
            </Link>
            <div className="flex flex-col justify-center items-start w-full px-6">
               {menu[userInfor.role]?.map((item) => {
                  return (
                     <Link
                        key={item.label}
                        to={`/${item.path}`}
                        className={clsx(
                           "py-2 px-5 mb-2 w-full rounded-md text-sm drop-shadow",
                           isActive === item.id
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100",
                        )}
                        onClick={() => {
                           handleOnclick(item.id);
                        }}
                     >
                        <span>{item.label}</span>
                     </Link>
                  );
               })}
            </div>

            <Link to={`/${PATHS.HOME.IDENTITY}`}>
               <div className="absolute w-full px-4 py-2 flex flex-row justify-center items-center bottom-0 left-0 z-20 text-white font-medium bg-blue-500 shadow-sm hover:shadow transition-all duration-200">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-5 h-5 mr-2"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                     />
                  </svg>
                  <span>Back to home</span>
               </div>
            </Link>
         </div>
         <div className="relative pl-52 w-[calc(100vw-208px)] flex-1 flex flex-col justify-center items-start min-h-screen">
            {/* Top bar */}
            <div className="h-20 md:px-5 lg:px-5 xl:px-10 w-[calc(100vw-208px)] fixed top-0 right-0 z-40 bg-white flex justify-between items-center drop-shadow">
               <h1 className="text-gray-700 font-semibold text-lg">
                  {userInfor?.role}
               </h1>
               <div className="md:w-[260px] lg:w-[400px] xl:w-[500px]">
                  <Searchbar paramName="search" setParams={setParams} />
               </div>
               <div className="w-fit text-sm">
                  <UserInformation data={userInfor as IUserInformation} />
               </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex justify-center mt-20 overflow-x-hidden">
               <Suspense fallback={<Loading />}>
                  <Outlet />
               </Suspense>
            </div>
         </div>
      </div>
   ) : (
      <Navigate to={`/${PATHS.HOME.IDENTITY}`} />
   );
};

export default RolePage;
