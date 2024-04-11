import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getContributionList } from "../../redux/slices/contributionSlice";
import ContributionList from "../../components/ContributionList/ContributionList";
import Pagination from "../../components/Pagination/Pagination";
import useRedux from "../../hooks/useRedux";
import { getContributionList } from "../../redux/slices/contributionSlice";
import { getPeriod } from "../../redux/slices/periodSlide";
import { RootState } from "../../redux/store";
import Pagination from "../../components/Pagination/Pagination";

const ContributionCategory = () => {
   const { dispatch, appSelector } = useRedux();
   const [searchParams] = useSearchParams();
   const { faculty } = appSelector((state: RootState) => state.faculty);
   const { category } = useParams<{ category: string }>() || "";
   const { list, totalPage } = appSelector(
      (state: RootState) => state.contribution,
   );
   const facultyId = faculty.find((item) => item.name === category)?.id;
   const [current, setCurrent] = useState(1);

   const changePage = (page: number) => {
      setCurrent(page);
   };

   useEffect(() => {
      const query = searchParams.get("search") as string;
      dispatch(
         getContributionList({
            filters: {
               status: "published",
               search: query,
               facultyId: facultyId,
            },
            pageSize: 10,
            page: current,
         }),
      );
   }, [dispatch, facultyId, searchParams, current]);

   useEffect(() => {
      setCurrent(1);
   }, [searchParams]);

  return (
    <div className="w-full md:w-full lg:w-[960px] xl:w-[1200px] py-5 ">
      <div className="w-full flex justify-between items-end">
        <div className="w-full flex justify-start items-center">
          <div className="ml-4">
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

        <div className="flex justify-center items-center mr-4">
          <label htmlFor="sort" className="w-16 text-sm text-gray-600">
            Sort by:
          </label>
          <select
            id="sort"
            className="bg-transparent text-right appearance-none w-36 py-2 text-gray-600 font-medium border-0 rounded leading-tight focus:outline-none hover:cursor-pointer"
            defaultValue={"All"}
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
      <ContributionList
        categoryName={category || ""}
        data={list}
        type="full"
        for="guest"
      />
      <Pagination total={totalPage} current={current} setPage={changePage} />
    </div>
  );
};

export default ContributionCategory;
