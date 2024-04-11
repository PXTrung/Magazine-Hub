/* eslint-disable react/style-prop-object */
import React, { useEffect, useState } from "react";
import useRedux from "../../hooks/useRedux";
import {
  getContributionListWithToken,
  getZipAll,
} from "../../redux/slices/contributionSlice";
import { getPeriod } from "../../redux/slices/periodSlide";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/loading/Loading";
import Table from "./components/ContributionTable/Table";
import Button from "../../components/CustomButton";

const status = ["Approved", "Processing", "Processed", "Rejected", "Published"];

interface IFilters {
  status: string | "";
  period: string | "";
}

const Manager = () => {
   const location = useLocation();
   const { appSelector, dispatch } = useRedux();
   const [searchParams] = useSearchParams();
   const { userInfor } = appSelector((state) => state.auth);
   const { list, totalPage, isLoading, zip } = appSelector(
      (state) => state.contribution,
   );
   const [filter, setFilter] = useState<IFilters>({ period: "", status: "" });
   const [current, setCurrent] = useState(1);
   const { period } = appSelector((state) => state.period);
   const [sort, setSort] = useState("");

  const changePage = (page: number) => {
    setCurrent(page);
  };

   useEffect(() => {
      const query = searchParams.get("search") as string;

      dispatch(
         getContributionListWithToken({
            filters: {
               status: filter.status,
               period: filter.period,
               search: query,
            },
            sorts: sort,
            page: current,
            pageSize: 10,
         }),
      );
   }, [
      dispatch,
      userInfor,
      location.pathname,
      filter,
      current,
      searchParams,
      sort,
   ]);

  useEffect(() => {
    dispatch(getPeriod());
    dispatch(getZipAll());
  }, [dispatch, filter]);

   return (
      <>
         {isLoading && <Loading />}
         <div className="w-full md:w-full lg:w-[960px] xl:w-[1200px] py-5 ">
            <div className="w-full flex justify-between items-end pb-5">
               <div className="w-full flex justify-start items-end">
                  <div className="mr-3">
                     <label htmlFor="status" className="text-sm text-gray-600">
                        Status
                     </label>
                     <select
                        id="status"
                        className="block appearance-none w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
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
                  <div className="mr-5">
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
                  <div className="flex justify-center items-center">
                     <label
                        htmlFor="sort"
                        className="w-16 text-sm text-gray-600"
                     >
                        Sort by:
                     </label>
                     <select
                        id="sort"
                        className="bg-transparent text-right appearance-none w-36 py-2 text-gray-600 font-medium border-0 rounded leading-tight focus:outline-none hover:cursor-pointer"
                        onChange={(event) => {
                           setSort(event.target.value);
                           changePage(1);
                        }}
                     >
                        <option key={1} value="title">
                           Title (A-Z)
                        </option>
                        <option key={2} value="-title">
                           Title (Z-A)
                        </option>
                        <option key={3} value="createdAt">
                           Created (Newest)
                        </option>
                        <option key={4} value="-createdAt">
                           Created (Oldest)
                        </option>
                     </select>
                  </div>
               </div>
               <a href={zip} download={"PublishedContribution"}>
                  <Button label="Download" type="primary" style="h-9" />
               </a>
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

export default Manager;
