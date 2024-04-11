import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { getContributionList } from "../../redux/slices/contributionSlice";
import ContributionList from "../../components/ContributionList/ContributionList";
import useRedux from "../../hooks/useRedux";
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
      <div>
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
