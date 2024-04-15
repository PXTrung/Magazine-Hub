/* eslint-disable jsx-a11y/img-redundant-alt */
import { IContributionDetail } from "../../../../types/contribution.type";

interface ITableProps {
   name: string;
   data?: IContributionDetail[];
}

const DashboardTable = ({ name, data }: ITableProps) => {
   return (
      <>
         <div className="w-full bg-white flex flex-col text-sm px-6 py-6 rounded-lg drop-shadow-md h-full">
            <h2 className="text-lg font-bold text-blue-950 py-1">{name}</h2>
            <div className="w-full overflow-x-scroll">
               <div className="min-w-[620px] grid grid-cols-6 gap-4 text-gray-400 font-medium py-5">
                  <span className="col-span-1">Avatar</span>
                  <span className="col-span-2">Full Name</span>
                  <span className="col-span-2">Email</span>
                  <span className="col-span-1 text-center">Total</span>
               </div>

               <div>
                  {data?.map((contribution) => {
                     return (
                        <div className="min-w-[620px] grid grid-cols-6 gap-4 text-gray-400 font-medium py-5">
                           <span className="col-span-1">Avatar</span>
                           <span className="col-span-2">Full Name</span>
                           <span className="col-span-2">Email</span>
                           <span className="col-span-1 text-center">Total</span>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default DashboardTable;
