import React, { useEffect, useState } from "react";
import Feedback from "../../../../components/Feedback";
import useRedux from "../../../../hooks/useRedux";
import { useParams } from "react-router-dom";
import {
   getFeedbackByContributionId,
   postFeedback,
} from "../../../../redux/slices/feedbackSlide";
import Button from "../../../../components/CustomButton";
import { getContributionById } from "../../../../redux/slices/contributionSlice";
import { getPeriod } from "../../../../redux/slices/periodSlide";

interface IFeedbackListProps {
   status: string;
   period: string;
}

const FeedbackList = (contribution: IFeedbackListProps) => {
   const { dispatch, appSelector } = useRedux();
   const { id } = useParams<{ id: string }>();
   const { feedback, isError } = appSelector((state) => state.feedback);
   const { period } = appSelector((state) => state.period);
   const [content, setContent] = useState("");
   const allowedStatuses = ["Approved", "Rejected", "Published"];
   const thisPeriod = period.find((p) => p.id === contribution.period);
   const [overTime, setOverTime] = useState<Boolean>(false);

   const disableUpdate = () => {
      console.log(contribution.status);

      console.log(allowedStatuses.includes(contribution.status as string));

      if (allowedStatuses.includes(contribution.status as string)) {
         return setOverTime(
            allowedStatuses.includes(contribution.status as string),
         );
      }

      const today = new Date();
      const deadline = new Date(thisPeriod?.secondSubmissionDeadline as string);

      return setOverTime(today > deadline);
   };

   const handleOnchange = (e: any) => {
      setContent(e.target.value);
   };

   const clearContent = () => {
      setContent("");
   };

   const submitFeedback = async () => {
      if (id) {
         await dispatch(postFeedback({ content, contributionId: id }));
         await dispatch(getFeedbackByContributionId(id));
         await dispatch(getContributionById(id));
         clearContent();
      }
   };

   useEffect(() => {
      if (id) {
         dispatch(getFeedbackByContributionId(id));
      }
      dispatch(getPeriod());
      disableUpdate();
   }, [dispatch, id]);

   console.log(overTime);

   return (
      <div className="max-h-[550px] w-full">
         {overTime === false && (
            <div className="flex flex-col gap-2">
               <div className="w-full flex flex-col gap-2 mb-1 border-b-2 border-gray-200 pb-4">
                  <input
                     type="text"
                     id="feedback"
                     placeholder="Your feedback"
                     className="w-full h-10 px-4 ring-0 outline-0"
                     onChange={(e) => handleOnchange(e)}
                     value={content}
                  />
                  <Button
                     label="Submit"
                     type="primary"
                     onClick={submitFeedback}
                  />
               </div>
            </div>
         )}
         <div className="max-h-[400px] overflow-x-hidden overflow-y-scroll w-full flex flex-col gap-2 mb-4">
            {feedback?.map((feedback) => {
               return <Feedback feedback={feedback} key={feedback.id} />;
            })}
         </div>
      </div>
   );
};

export default FeedbackList;
