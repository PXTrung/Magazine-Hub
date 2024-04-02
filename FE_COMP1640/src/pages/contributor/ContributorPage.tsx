import React, { useEffect } from "react";
import useRedux from "../../hooks/useRedux";

const ContributorPage = () => {
   const { appSelector, dispatch } = useRedux();

   // useEffect(() => {
   //    dispatch(getContri)
   // })
   
   return <div>ContributorPage</div>;
};

export default ContributorPage;
