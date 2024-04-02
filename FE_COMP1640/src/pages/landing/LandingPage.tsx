import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  getContributionByPagination,
  getContributionByStatus,
} from "../../redux/slices/contributionSlice";
import { getFaculty } from "../../redux/slices/facultySlice";
import ContributionList from "../contribution/components/ContributionList";
import useRedux from "../../hooks/useRedux";

const LandingPage = () => {
   const { dispatch, appSelector } = useRedux();
   const { list, netxPagelink } = appSelector(
      (state: RootState) => state.contribution,
   );
   const { faculty } = appSelector((state: RootState) => state.faculty);

   useEffect(() => {
      dispatch(getContributionByStatus("status==published"));
      dispatch(getFaculty());
   }, [dispatch]);

   console.log(netxPagelink);

  return (
    <>
      <HeroSection />
      {faculty.map((faculty) => {
        const contributions = list.filter(
          (contribution) => contribution.facultyName === faculty.name
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
