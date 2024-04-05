import clsx from "clsx";
import React from "react";

interface IPaginationProps {
   setPage: Function;
   total: number;
   current: number;
}

const Pagination = ({ setPage, total, current }: IPaginationProps) => {
   return (
      <div className="flex flex-row justify-end w-full gap-1 py-4">
         <button
            className={clsx(
               "border-2 border-slate-200 shadow-sm h-9 w-9 text-sm rounded-md flex justify-center items-center bg-white text-gray-600",
               current === 1 && "opacity-30",
            )}
            onClick={() => setPage(current - 1)}
            disabled={current === 1}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-4 h-4"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
               />
            </svg>
         </button>
         {Array.from({ length: total }, (_, index) => (
            <button
               key={index + 1}
               className={clsx(
                  "border-2 h-9 w-9 text-sm rounded-md shadow-sm",
                  index + 1 === current
                     ? "bg-blue-500 text-white border-blue-600"
                     : "bg-white text-gray-500 border-slate-200",
               )}
               onClick={() => setPage(index + 1)}
            >
               {index + 1}
            </button>
         ))}
         <button
            className={clsx(
               "border-2 border-slate-200 shadow-sm h-9 w-9 text-sm rounded-md flex justify-center items-center bg-white text-gray-600",
               current === total && "opacity-30",
            )}
            onClick={() => setPage(current + 1)}
            disabled={current === total}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-4 h-4"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
               />
            </svg>
         </button>
      </div>
   );
};

export default Pagination;
