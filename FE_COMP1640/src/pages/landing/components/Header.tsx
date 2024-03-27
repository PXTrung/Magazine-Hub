/* eslint-disable react/style-prop-object */
import React from "react";
import Searchbar from "../../../components/Searchbar";
import Button from "../../../components/CustomButton";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import UserInformation from "./UserInformation";

const Header = () => {
   const { isLogin, userInfor } = useSelector(
      (state: RootState) => state.userLogin,
   );
   return (
      <div className="w-full absolute top-0 left-0 bg-white shadow-2xl flex flex-row justify-center items-center z-30">
         <div
            className={`h-16 lg:h-24 w-full md:w-full lg:w-[960px] xl:w-[1200px] flex flex-row justify-between items-center 
                        px-4 md:px-10 lg:p-0`}
         >
            <div className="lg:hidden">
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
            <div className="hidden lg:block xl:w-1/4">
               <Searchbar />
            </div>
            <div className="w-1/4 flex justify-center">
               <span className="text-3xl font-bold">LOGO</span>
            </div>

            <div className="lg:hidden">
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
            </div>
            <div className="w-1/4 justify-end items-center hidden lg:flex">
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
