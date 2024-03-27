import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import VerticalContributionList from "./components/VerticalContributionList";
import HorizontalContributionList from "./components/HorizonContributionList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllContributions } from "../../redux/slices/contributionSlice";

const LandingPage = () => {
   const { list } = useSelector((state: RootState) => state.contribution);
   const dispatch = useDispatch<AppDispatch>();

   useEffect(() => {
      dispatch(getAllContributions("status=published"));
   }, [dispatch]);

   return (
      <>
         <HeroSection />
         <VerticalContributionList category="Business" data={list} />
         {/* <HorizontalContributionList /> */}
      </>
   );
};

export default LandingPage;
