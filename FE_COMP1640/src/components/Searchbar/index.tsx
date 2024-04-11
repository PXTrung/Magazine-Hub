/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getContributionListWithToken } from "../../redux/slices/contributionSlice";
import { useLocation, useSearchParams } from "react-router-dom";

const Searchbar = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const ref = useRef<HTMLInputElement>(null);
   const location = useLocation();

   const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSearchParams({ search: ref.current?.value as string });
   };

   useEffect(() => {
      setSearchParams();
   }, [location.pathname]);

   return (
      <form
         onSubmit={handleSearch}
         className="flex flex-row justify-between items-center h-10 w-full rounded-full
            border-[2px] border-gray-300 "
      >
         <input
            type="text"
            placeholder="Search..."
            className="w-full pl-4 outline-none ring-0 rounded-full"
            ref={ref}
         />
         <button className="pr-3">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={2}
               stroke="currentColor"
               className="w-5 h-5 text-gray-400"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
               />
            </svg>
         </button>
      </form>
   );
};

export default Searchbar;
