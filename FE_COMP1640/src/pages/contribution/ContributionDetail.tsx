/* eslint-disable react/style-prop-object */
import { AppDispatch, RootState } from "../../redux/store";
import Loading from "../../components/loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { getContributionById } from "../../redux/slices/contributionSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../components/CustomButton";

function formatDate(timestamp: string | undefined): string {
   if (!timestamp) {
      return ""; // or any other default value or behavior you prefer
   }

   const date = new Date(timestamp);

   const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Bangkok", // Set your desired time zone
      timeZoneName: "short",
   };

   const formattedDate = date.toLocaleString("en-GB", options);

   return formattedDate;
}

const ContributionDetail = () => {
   const dispatch = useDispatch<AppDispatch>();
   const { id } = useParams<{ id: string }>();
   const { isError, message, isLoading, detail } = useSelector(
      (state: RootState) => state.contribution,
   );

   let publishedDate = formatDate(detail?.lastModifiedAt);

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
            <div
               className="w-full h-full flex-1 mt-16 mb-10 lg:mt-32 lg:mb-16 lg:w-[960px] xl:w-[1200px]
                           px-4 md:px-10 lg:p-0 pt-5 bg-white lg:bg-transparent lg:grid lg:grid-cols-3 lg:gap-5"
            >
               <div className="flex flex-col justify-center items-center pb-8 lg:px-5 lg:col-span-2">
                  <div className="w-full pt-2 lg:pt-0 md:pb-5 lg:pb-0 border-b">
                     <div className="w-full flex justify-between items-center text-gray-400 font-normal text-sm">
                        <span className="font-medium">
                           {detail?.createdByFullName || "Nguyen Van A"}
                        </span>
                        <span>{publishedDate}</span>
                     </div>
                     <h1 className="w-full my-5 leading-normal lg:leading-normal font-semibold text-2xl md:text-3xl lg:text-4xl text-left text-gray-900 line-clamp-2">
                        {detail?.title}
                     </h1>
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
                     className="w-full object-cover"
                  />
                  <div className="w-full mt-5 py-5 flex justify-between items-center md:justify-start text-gray-700 border-t">
                     <span className="md:mr-8">Document:</span>
                     <Button
                        label="Download"
                        type="primary"
                        style="text-sm h-7"
                     />
                  </div>
               </div>
               <div className="lg:col-span-1 bg-gray-300"></div>
            </div>
         )}
         {isError && <span>{message}</span>}
      </>
   );
};

export default ContributionDetail;
