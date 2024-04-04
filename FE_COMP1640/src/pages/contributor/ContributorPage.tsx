/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import useRedux from "../../hooks/useRedux";
import { getContributionListWithToken } from "../../redux/slices/contributionSlice";
import ContributionList from "../contribution/components/ContributionList";

const ContributorPage = () => {
   const { appSelector, dispatch } = useRedux();
   const { userInfor } = appSelector((state) => state.auth);
   const { list } = appSelector((state) => state.contribution);

   useEffect(() => {
      dispatch(
         getContributionListWithToken({ filters: { email: userInfor?.email } }),
      );
   }, [dispatch, userInfor]);

   return (
      <div>
         <ContributionList
            categoryName="My contribution"
            data={list}
            type="full"
            for="user"
         />
      </div>
   );
};

export default ContributorPage;
