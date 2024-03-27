import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { IContributionData } from "../../types/contribution.type";

interface IContributionProps {
   type: "vertical" | "horizontal";
   contribution: IContributionData;
}

const Contribution = (data: IContributionProps) => {
   return (
      <Link
         to={`/${PATHS.CONTRIBUTION.IDENTIFY}/abc-abs`}
         className="w-fit mt-4"
      >
         {data.type === "vertical" ? (
            <div className="md:w-[280px] flex flex-col justify-center items-center rounded-lg overflow-hidden bg-white shadow-md hover:cursor-pointer hover:shadow-lg transition-all duration-200">
               <img
                  src={data.contribution.coverImageUrl}
                  alt="poster"
                  className="object-cover w-full h-[180px]"
               />
               <div className="w-full p-6">
                  <div className="flex flex-col w-full mb-10">
                     <h3 className="text-lg text-gray-900 font-semibold mb-2 truncate">
                        {data.contribution.title}
                     </h3>
                     <span className="w-full lg:h-[60px] text-sm text-gray-700 line-clamp-3">
                        {data.contribution.description}
                     </span>
                  </div>

                  <span className="w-full text-left text-sm font-medium text-blue-600 hover:cursor-pointer">
                     Read more
                  </span>
               </div>
            </div>
         ) : (
            <div className="w-full h-40 bg-white shadow border rounded flex justify-between items-center overflow-hidden hover:cursor-pointer hover:shadow-md transition-all duration-200">
               <div className="h-full">
                  <img
                     src={data.contribution.coverImageUrl}
                     alt=""
                     className="h-full object-cover"
                  />
               </div>
               <div className="h-full flex-1 p-5">
                  <div className="flex flex-col w-full mb-6">
                     <h3 className="text-lg text-gray-900 font-semibold mb-2">
                        {data.contribution.title}
                     </h3>
                     <span className="w-full text-sm text-gray-700 line-clamp-2">
                        {data.contribution.description}
                     </span>
                  </div>

                  <span className="w-full text-left text-sm font-medium text-blue-600 hover:cursor-pointer">
                     Read more
                  </span>
               </div>
            </div>
         )}
      </Link>
   );
};

export default Contribution;
