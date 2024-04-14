import Row from "./Row";
import { IContributionDetail } from "../../../../types/contribution.type";
import useRedux from "../../../../hooks/useRedux";
import Button from "../../../../components/CustomButton";

interface ITableProps {
   name: string;
   data: IContributionDetail[];
}

const Table = ({ name, data }: ITableProps) => {
   const { appSelector } = useRedux();

   const { zip } = appSelector((state) => state.contribution);
   return (
      <>
         <div className="w-full bg-white flex flex-col text-sm px-6 py-6 rounded-lg drop-shadow-md">
            <div className="w-full flex justify-between items-center">
               <h2 className="text-lg font-bold text-blue-950 py-1">{name}</h2>
               <a href={zip} download={"PublishedContribution"}>
                  <Button label="Download" type="primary" style="h-9" />
               </a>
            </div>
            <div className="w-full overflow-x-scroll">
               <div className="min-w-[940px] grid grid-cols-12 gap-4 text-gray-400 font-medium py-5">
                  <span className="col-span-3">Title</span>
                  <span className="col-span-3">Description</span>
                  <span className="col-span-2">Faculty</span>
                  <span className="col-span-1">Image</span>
                  <span className="col-span-2">CreatedAt</span>
                  <span className="col-span-1">Status</span>
               </div>

               <div>
                  {data.map((contribution) => {
                     return (
                        <Row
                           contribution={contribution}
                           key={contribution.id}
                        />
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default Table;
