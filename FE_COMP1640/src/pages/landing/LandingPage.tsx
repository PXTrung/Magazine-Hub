import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getContributionByStatus } from "../../redux/slices/contributionSlice";
import { getFaculty } from "../../redux/slices/facultySlice";
import ContributionList from "../contribution/components/ContributionList";

const LandingPage = () => {
   const { list } = useSelector((state: RootState) => state.contribution);
   const { faculty } = useSelector((state: RootState) => state.faculty);
   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(getContributionByStatus("status=published"));
      dispatch(getFaculty());
   }, [dispatch]);

   return (
      <>
         <HeroSection />
         {faculty.map((faculty) => {
            const contributions = list.filter(
               (contribution) => contribution.facultyName === faculty.name,
            );
            return (
               <ContributionList
                  key={faculty.id}
                  type="category"
                  categoryName={faculty.name}
                  data={contributions.slice(0, 4)}
               />
            );
         })}
      </>
   );
};

export default LandingPage;
