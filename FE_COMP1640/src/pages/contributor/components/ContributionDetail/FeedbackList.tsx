import React, { useEffect } from "react";
import Feedback from "../../../../components/Feedback";
import useRedux from "../../../../hooks/useRedux";
import { useParams } from "react-router-dom";
import { getFeedbackByContributionId } from "../../../../redux/slices/feedbackSlide";

const FeedbackList = () => {
   const { dispatch, appSelector } = useRedux();
   const { id } = useParams<{ id: string }>();
   const { feedback } = appSelector((state) => state.feedback);

   useEffect(() => {
      if (id) {
         dispatch(getFeedbackByContributionId(id));
      }
   }, [dispatch, id]);

   return (
      <div className="ml-4 max-h-[550px] overflow-y-scroll">
         {feedback.length === 0 ? (
            <h2 className="text-center text-sm text-gray-400 font-medium px-2">
               There has been no feedback from the coordinator yet.
            </h2>
         ) : (
            <div className="flex flex-col gap-2">
               {feedback?.map((feedback) => {
                  return <Feedback feedback={feedback} key={feedback.id} />;
               })}
            </div>
         )}
      </div>
   );
};

export default FeedbackList;
