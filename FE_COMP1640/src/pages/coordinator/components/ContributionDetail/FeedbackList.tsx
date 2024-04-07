import React, { useEffect, useState } from "react";
import Feedback from "../../../../components/Feedback";
import useRedux from "../../../../hooks/useRedux";
import { useParams } from "react-router-dom";
import {
   getFeedbackByContributionId,
   postFeedback,
} from "../../../../redux/slices/feedbackSlide";
import Button from "../../../../components/CustomButton";

const FeedbackList = () => {
   const { dispatch, appSelector } = useRedux();
   const { id } = useParams<{ id: string }>();
   const { feedback } = appSelector((state) => state.feedback);
   const [content, setContent] = useState("");

   const handleOnchange = (e: any) => {
      setContent(e.target.value);
   };

   const submitFeedback = () => {
      if (id) {
         dispatch(getFeedbackByContributionId(id));
         dispatch(postFeedback({ content, contributionId: id }));
      }
   };

   useEffect(() => {
      if (id) {
         dispatch(getFeedbackByContributionId(id));
      }
   }, [dispatch, id]);

   return (
      <div className="ml-4 w-[400px] overflow-hidden">
         <div className="flex flex-col gap-2">
            <div className="w-full flex flex-col gap-2 mb-1 border-b-2 border-gray-200 pb-4">
               <input
                  type="text"
                  placeholder="Your feedback"
                  className="w-full h-10 px-4"
                  onChange={(e) => handleOnchange(e)}
               />
               <Button label="Submit" type="primary" onClick={submitFeedback} />
            </div>
            <div className="max-h-[500px] overflow-x-hidden overflow-y-scroll w-full flex flex-col gap-2 mb-4">
               {feedback?.map((feedback) => {
                  return <Feedback feedback={feedback} key={feedback.id} />;
               })}
            </div>
         </div>
      </div>
   );
};

export default FeedbackList;
