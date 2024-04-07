/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useRedux from "../../hooks/useRedux";
import { getContributionListWithToken } from "../../redux/slices/contributionSlice";
import { getPeriod } from "../../redux/slices/periodSlide";
import { RootState } from "../../redux/store";
import { useLocation } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/loading/Loading";
import Table from "./components/ContributionTable/Table";

const status = ["Approved", "Processing", "Processed", "Rejected", "Published"];

interface IFilters {
   status: string | "";
   period: string | "";
}

const ContributorPage = () => {
   const location = useLocation();
   const { appSelector, dispatch } = useRedux();
   const { userInfor } = appSelector((state) => state.auth);
   const { list, currentPage, totalPage, isLoading } = appSelector(
      (state) => state.contribution,
   );
   const [filter, setFilter] = useState<IFilters>({ period: "", status: "" });
   const [current, setCurrent] = useState(1);
   const { period } = appSelector((state) => state.period);

   console.log(currentPage);

   const changePage = (page: number) => {
      setCurrent(page);
   };

   useEffect(() => {
      dispatch(
         getContributionListWithToken({
            filters: {
               email: userInfor?.email,
               status: filter.status,
               period: filter.period,
            },
            page: current,
            pageSize: 10,
         }),
      );
   }, [dispatch, userInfor, location.pathname, filter, current]);

   useEffect(() => {
      dispatch(getPeriod());
   }, [filter]);

   return (
      <>
         {isLoading && <Loading />}
         <div className="w-full md:w-full lg:w-[960px] xl:w-[1200px] py-5 ">
            <div className="w-full flex justify-start items-center pb-5">
               <div className="mr-3">
                  <label htmlFor="status" className="text-sm text-gray-600">
                     Status
                  </label>
                  <select
                     id="status"
                     className="block appearance-none w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
                     defaultValue={"All"}
                     onChange={(event) => {
                        setFilter({ ...filter, status: event.target.value });
                        changePage(1);
                     }}
                  >
                     <option key={"all"} value={""}>
                        All
                     </option>
                     {status?.map((item) => {
                        return (
                           <option key={item} value={item}>
                              {item}
                           </option>
                        );
                     })}
                  </select>
               </div>
               <div>
                  <label htmlFor="period" className="text-sm text-gray-600">
                     Period
                  </label>
                  <select
                     id="period"
                     className="block appearance-none w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
                     defaultValue={"All"}
                     onChange={(event) => {
                        setFilter({ ...filter, period: event.target.value });
                        changePage(1);
                     }}
                  >
                     <option key={"all"} value={""}>
                        All
                     </option>
                     {period?.map((item) => {
                        return (
                           <option key={item.id} value={item.id}>
                              {item.academicYear}
                           </option>
                        );
                     })}
                  </select>
               </div>
            </div>
            <Table data={list} name="My contribution" />
            <Pagination
               total={totalPage}
               current={current}
               setPage={changePage}
            />
         </div>
      </>
   );
};

export default ContributorPage;
