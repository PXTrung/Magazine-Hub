import React, { useEffect } from "react";
import HeroSection from "./components/HeroSection";
import VerticalContributionList from "./components/VerticalContributionList";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getAllContributions } from "../../redux/slices/contributionSlice";
import { getFaculty } from "../../redux/slices/facultySlice";
import ContributionList from "../contribution/components/ContributionList";

const LandingPage = () => {
  const { list } = useSelector((state: RootState) => state.contribution);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllContributions("status==published"));
    dispatch(getFaculty());
  }, [dispatch]);

  return (
    <>
      <HeroSection />
      <ContributionList category="Business" data={list} />
    </>
  );
};

export default LandingPage;
