/* eslint-disable react/style-prop-object */
import React from "react";
import Searchbar from "../../../components/Searchbar";
import Button from "../../../components/CustomButton";
import { Link, useSearchParams } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { RootState } from "../../../redux/store";
import UserInformation from "./UserInformation";
import useRedux from "../../../hooks/useRedux";
import Sidebar from "./Sidebar";

const Header = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const { appSelector } = useRedux();
   const { isLogin, userInfor } = appSelector((state) => state.auth);

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

   return (
      <div className="w-full fixed top-0 left-0 bg-white shadow-lg flex flex-row justify-center items-center z-30">
         <div
            className={`h-16 md:h-20 lg:h-24 w-full lg:w-[960px] xl:w-[1200px] flex flex-row justify-between items-center px-4 md:px-10 lg:p-0`}
         >
            <div className="hidden md:block w-1/4">
               <Searchbar paramName="search" setParams={setParams} />
            </div>

            <Sidebar />

            <Link
               to={`/${PATHS.HOME.IDENTITY}`}
               className="w-1/4 flex justify-center"
            >
               <img
                  src="./assets/images/logo.jpg"
                  alt=""
                  className="h-12 md:h-14 lg:h-16"
               />
            </Link>

            {/* <div className="md:hidden">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8 text-slate-800"
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
               </svg>
            </div> */}
            <div className="md:hidden">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6 text-slate-800 "
               >
                  <path
                     strokeLinecap="round"
                     strokeLinejoin="round"
                     d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
               </svg>
            </div>
            <div className="w-1/4 justify-end items-center hidden md:flex">
               {isLogin && userInfor ? (
                  <UserInformation data={userInfor} />
               ) : (
                  <div className="flex ">
                     <Link to={`/auth/${PATHS.AUTH.REGISTER}`}>
                        <Button label="Register" type={"border"} style="mr-2" />
                     </Link>
                     <Link to={`/auth/${PATHS.AUTH.LOGIN}`}>
                        <Button label="Login" type={"primary"} />
                     </Link>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;
