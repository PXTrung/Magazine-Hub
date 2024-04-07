/* eslint-disable react/style-prop-object */

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useRedux from "../../../../hooks/useRedux";
import formatDate from "../../../../utils/functions";
import Loading from "../../../../components/loading/Loading";
import Button from "../../../../components/CustomButton";
import { getContributionById } from "../../../../redux/slices/contributionSlice";
import FeedbackList from "./FeedbackList";
import Status from "../../../../components/Contribution/Status";

const ViewContribution = () => {
   const { dispatch, appSelector } = useRedux();
   const { id } = useParams<{ id: string }>();
   const { isError, message, isLoading, detail } = appSelector(
      (state) => state.contribution,
   );

   let publishedDate = formatDate(detail?.lastModifiedAt as string);

   useEffect(() => {
      if (id) {
         dispatch(getContributionById(id));
      }
   }, [dispatch, id]);

   return (
      <>
         {isLoading ? (
            <Loading />
         ) : (
            <div className="flex flex-row justify-center items-start gap-4 pt-5">
               <div className="w-full h-full flex justify-center items-center flex-1  bg-white md:bg-transparent">
                  <div className="w-[700px] flex flex-col justify-center items-center px-8 py-4 bg-white">
                     <div className="w-full border-b">
                        <div className="w-full flex justify-between items-center text-gray-400 font-normal text-sm">
                           <span className="font-medium">
                              {detail?.createdByFullName}
                           </span>
                           <span>{publishedDate}</span>
                        </div>
                        <div className="w-full my-5 flex justify-between items-center">
                           <h1 className="leading-normal lg:leading-normal font-semibold text-2xl text-left text-gray-900 line-clamp-2">
                              {detail?.title}
                           </h1>
                           <div className="h-5 w-20">
                              <Status status={detail?.status} />
                           </div>
                        </div>
                     </div>

                     <p className="w-full my-4 xl:my-5 text-left text-gray-700 font-medium">
                        {detail?.description}
                     </p>
                     <img
                        src={
                           detail?.coverImageUrl ||
                           "https://th.bing.com/th/id/R.e7b98af026b39429f7b0e71a1f728ee7?rik=0WQqQyiogQB1LQ&pid=ImgRaw&r=0"
                        }
                        alt="cover-poster"
                        className="w-2/3 object-cover"
                     />
                     <a
                        href={detail?.documentUrl}
                        className="w-full mt-5 py-5 flex justify-between items-center md:justify-start text-gray-700 border-t"
                     >
                        <span className="md:mr-8">Document:</span>
                        <Button
                           label="Download"
                           type="primary"
                           style="text-sm h-7"
                        />
                     </a>
                  </div>
               </div>
               <FeedbackList />
            </div>
         )}

         {isError && <span>{message}</span>}
      </>
   );
};

export default ViewContribution;
