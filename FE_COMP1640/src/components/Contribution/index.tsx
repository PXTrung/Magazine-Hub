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
         to={`/${PATHS.CONTRIBUTION.IDENTITY}/${data.contribution.id}`}
         className="w-fit mb-2 md:mb-3 lg:mb-0"
      >
         <div className="w-full h-40 md:h-48 lg:h-40 bg-white shadow border rounded grid grid-cols-3 overflow-hidden hover:cursor-pointer hover:shadow-md hover:scale-[1.01] transition-all duration-300">
            <img
               src={
                  data?.contribution?.coverImageUrl ||
                  "https://th.bing.com/th/id/R.e7b98af026b39429f7b0e71a1f728ee7?rik=0WQqQyiogQB1LQ&pid=ImgRaw&r=0"
               }
               alt=""
               className="h-full object-cover col-span-1"
            />
            <div className="h-full flex-1 p-5 col-span-2">
               <div className="flex flex-col w-full mb-6">
                  <h3 className="text-lg text-gray-900 font-semibold mb-2 line-clamp-1">
                     {data.contribution.title}
                  </h3>
                  <span className="w-full text-sm text-gray-700 line-clamp-2">
                     {data.contribution.description ||
                        `Lorem ipsum dolor sit
                     amet consectetur adipisicing elit. Officia ducimus iste,
                     inventore, necessitatibus earum nihil saepe amet facere in
                     odio eos minima mollitia voluptate modi debitis! Qui
                     deserunt quis impedit?`}
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

export default Contribution;
