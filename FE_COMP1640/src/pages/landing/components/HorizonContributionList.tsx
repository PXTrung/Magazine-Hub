import React from "react";
import Contribution from "../../../components/Contribution";

const HorizontalContributionList = () => {
   return (
      <div className="w-full md:w-full lg:w-[960px] xl:w-[1200px] md:my-10">
         <h3 className="pl-2 md:mb-10 leading-4 tracking-wide text-lg text-blue-700 font-medium border-l-4 border-blue-700">
            Technology
         </h3>
         <div className="h-fit flex flex-row justify-between items-center">
            <img
               src="https://images.squarespace-cdn.com/content/v1/56047ac1e4b0612d66a56646/1639753264050-UM5H45D93RXW53FENOKB/CXL+background+graphic+1.jpg"
               alt=""
               className="w-[280px] h-[500px] object-cover"
            />
            <div className="h-[500px] flex-1 lg:ml-14 flex flex-col justify-between items-stretch"></div>
         </div>
      </div>
   );
};

export default HorizontalContributionList;
