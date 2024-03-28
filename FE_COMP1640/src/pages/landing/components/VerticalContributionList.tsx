import React from "react";
import Contribution from "../../../components/Contribution";
import { IContributionData } from "../../../types/contribution.type";

interface IListProps {
   data: IContributionData[];
   category: string;
}

const VerticalContributionList = (contribution: IListProps) => {
   return (
      <div className="min-h-[500px] w-full md:w-full lg:w-[960px] xl:w-[1200px] md:py-10">
         <h3 className="pl-2 md:mb-10 leading-4 tracking-wide text-lg text-blue-700 font-medium border-l-4 border-blue-700">
            {contribution.category}
         </h3>
         <div className="grid lg:grid-cols-3 xl:grid-cols-4 justify-between items-center">
            {contribution.data.map((item) => (
               <Contribution
                  type="vertical"
                  contribution={item}
                  key={item.id}
               />
            ))}
         </div>
      </div>
   );
};

export default VerticalContributionList;
