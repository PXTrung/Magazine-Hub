import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import { IContributionData } from "../../types/contribution.type";

const VerticalContribution = (contribution: IContributionData) => {
   return (
      <Link
         to={`/${PATHS.CONTRIBUTION.IDENTITY}/${contribution.id}`}
         className="w-fit mt-4"
      >
         <div className="md:w-[280px] flex flex-col justify-center items-center rounded-lg overflow-hidden bg-white shadow-md hover:cursor-pointer hover:shadow-lg transition-all duration-200">
            <img
               src={
                  contribution?.coverImageUrl ||
                  "https://th.bing.com/th/id/R.e7b98af026b39429f7b0e71a1f728ee7?rik=0WQqQyiogQB1LQ&pid=ImgRaw&r=0"
               }
               alt="poster"
               className="object-cover w-full h-[180px]"
            />
            <div className="w-full p-6">
               <div className="flex flex-col w-full mb-10">
                  <h3 className="text-lg text-gray-900 font-semibold mb-2 truncate">
                     {contribution.title}
                  </h3>
                  <span className="w-full lg:h-[60px] text-sm text-gray-700 line-clamp-3">
                     {contribution.description}
                  </span>
               </div>

               <span className="w-full text-left text-sm font-medium text-blue-600 hover:cursor-pointer">
                  Read more
               </span>
            </div>
         </div>
      </Link>
   );
};

export default VerticalContribution;
