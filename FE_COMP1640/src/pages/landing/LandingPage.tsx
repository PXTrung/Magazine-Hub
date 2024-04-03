import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
   getContributionByPagination,
   getContributionList,
} from "../../redux/slices/contributionSlice";
import { getFaculty } from "../../redux/slices/facultySlice";
import ContributionList from "../contribution/components/ContributionList";
import useRedux from "../../hooks/useRedux";

const LandingPage = () => {
   const { dispatch, appSelector } = useRedux();
   const { list, nextPageLink } = appSelector(
      (state: RootState) => state.contribution,
   );
   const { faculty } = appSelector((state: RootState) => state.faculty);

   useEffect(() => {
      dispatch(
         getContributionList({
            filters: { status: "published" },
            pageSize: 100,
         }),
      );
   }, [dispatch]);

   return (
      <>
         <HeroSection />
         <div className="mt-0 lg:mt-16">
            {faculty.map((faculty) => {
               const contributions = list.filter(
                  (contribution) => contribution.facultyId === faculty.id,
               );
               return (
                  <ContributionList
                     key={faculty.id}
                     type="category"
                     categoryName={faculty.name}
                     data={contributions.slice(0, 4)}
                     for="guest"
                  />
               );
            })}
         </div>
      </>
   );
};

export default LandingPage;
