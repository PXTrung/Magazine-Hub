import React from "react";
import Contribution from "../../../components/Contribution";
import { IContributionData } from "../../../types/contribution.type";

interface IListProps {
   data: IContributionData[];
   category: string;
}

const ContributionList = (contributions: IListProps) => {
   return (
      <div className="min-h-[500px] w-full md:w-full lg:w-[960px] xl:w-[1200px] py-3 md:py-5 px-4">
         <h3 className="pl-2 my-8 leading-4 tracking-wide text-lg text-blue-700 font-medium border-l-4 border-blue-700">
            {contributions.category}
         </h3>
         <div className="grid lg:grid-cols-2 lg:gap-4 justify-between items-center">
            {contributions.data.map((item) => (
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

export default ContributionList;
