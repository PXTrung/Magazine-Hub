import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import {
   getContributionByPagination,
   getContributionList,
} from "../../redux/slices/contributionSlice";
import ContributionList from "./components/ContributionList";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/store";

const ContributionCategory = () => {
   const { dispatch, appSelector } = useRedux();
   const { faculty } = appSelector((state: RootState) => state.faculty);
   const { category } = useParams<{ category: string }>() || "";
   const { isError, message, isLoading, list, nextPageLink } = appSelector(
      (state: RootState) => state.contribution,
   );

   const facultyId = faculty.find((item) => item.name === category)?.id;

   useEffect(() => {
      if (facultyId) {
         dispatch(
            getContributionList({
               filters: { facultyId: facultyId },
            }),
         );
      }
   }, [dispatch, facultyId]);

   return (
      <div>
         <ContributionList
            categoryName={category || ""}
            data={list}
            type="full"
            for="guest"
         />
         <button
            onClick={() => dispatch(getContributionByPagination(nextPageLink))}
         >
            Next Page
         </button>
      </div>
   );
};

export default ContributionCategory;
