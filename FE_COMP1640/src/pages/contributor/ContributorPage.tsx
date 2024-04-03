import React, { useEffect } from "react";
import useRedux from "../../hooks/useRedux";
import { getContributionByStatus } from "../../redux/slices/contributionSlice";
import ContributionList from "../contribution/components/ContributionList";

const ContributorPage = () => {
   const { appSelector, dispatch } = useRedux();
   const { userInfor } = appSelector((state) => state.auth);
   const { list } = appSelector((state) => state.contribution);

   useEffect(() => {
      dispatch(getContributionByStatus(userInfor?.email as string));
   }, []);

   console.log("====================================");
   console.log(list);
   console.log("====================================");

   return <div>
      <ContributionList categoryName="My contribution" data={list} type="full"/>
   </div>;
};

export default ContributorPage;
