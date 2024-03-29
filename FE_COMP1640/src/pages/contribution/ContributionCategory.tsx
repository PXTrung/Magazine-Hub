import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import { getContributionByFaculty } from "../../redux/slices/contributionSlice";
import contribution from "../../services/modules/contribution";
import ContributionList from "./components/ContributionList";

const ContributionCategory = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { faculty } = useSelector((state: RootState) => state.faculty);
   const { category } = useParams<{ category: string }>() || "";
   const { isError, message, isLoading, list } = useSelector(
      (state: RootState) => state.contribution,
   );

   const facultyId = faculty.find((item) => item.name === category)?.id;

   useEffect(() => {
      if (facultyId) {
         dispatch(getContributionByFaculty(facultyId));
      }
   }, [dispatch, facultyId]);

   return (
      <div>
         <ContributionList
            categoryName={category || ""}
            data={list}
            type="full"
         />
         ;
      </div>
   );
};

export default ContributionCategory;
