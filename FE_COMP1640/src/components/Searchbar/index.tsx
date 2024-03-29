import React, { FormEventHandler, useRef } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getAllContributions } from "../../redux/slices/contributionSlice";

const Searchbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLInputElement>(null);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(
      getAllContributions(`${"title" && "description"}@=*${ref.current?.value}`)
    );
  };

  return (
    <div
      className="h-10 flex flex-row justify-between items-center rounded-full
                     border-[2px] border-gray-300 "
    >
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          className="pl-4 outline-none ring-0 rounded-full"
          ref={ref}
        />
      </form>
      <div className="pr-3">
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
      </div>
    </div>
  );
};

export default Searchbar;
