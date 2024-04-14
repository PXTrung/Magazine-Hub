/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRedux from "../../../../hooks/useRedux";
import Input from "../../../../components/CustomInput";
import {
   getContributionById,
   updateContribution,
} from "../../../../redux/slices/contributionSlice";
import { getFeedbackByContributionId } from "../../../../redux/slices/feedbackSlide";
import FeedbackList from "../../../../components/Feedback/FeedbackList";
import Status from "../../../../components/Contribution/Status";
import { getPeriod } from "../../../../redux/slices/periodSlide";
import clsx from "clsx";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
   Title: yup.string(),
   Description: yup.string(),
   ImageFile: yup.mixed<FileList>(),
   DocumentFile: yup.mixed<File>(),
});

const shouldAppendToFormData = (
   formData: FormData,
   data: any,
   detail: any,
   key: string,
): boolean => {
   return (
      data[key] !== "" &&
      data[key] !== undefined &&
      data[key] !== detail[key?.toLowerCase()]
   );
};

const UpdateContribution = () => {
   const { dispatch, appSelector } = useRedux();
   const { id } = useParams<{ id: string }>();
   const { period } = appSelector((state) => state.period);
   const { isError, message, isLoading, detail } = appSelector(
      (state) => state.contribution,
   );

   const allowedStatuses = ["Approved", "Rejected", "Published"];
   const thisPeriod = period.find((p) => p.id === detail?.periodId);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      resolver: yupResolver<FieldValues>(schema),
   });

   const onSubmit: SubmitHandler<FieldValues> = async (data) => {
      if (id) {
         const formData = new FormData();

         if (shouldAppendToFormData(formData, data, detail, "Title")) {
            formData.append("title", data?.Title);
         }
         if (shouldAppendToFormData(formData, data, detail, "Description")) {
            formData.append("description", data?.Description);
         }
         if (data?.ImageFile) {
            formData.append("imageFile", data?.ImageFile[0]);
         }
         if (data?.DocumentFile) {
            formData.append("documentFile", data?.DocumentFile[0]);
         }

         formData.forEach((value, key) => {
            console.log(key, value);
         });

         await dispatch(updateContribution({ data: formData, id: id }));
         dispatch(getContributionById(id));
      }
   };

   const disableUpdate = () => {
      if (allowedStatuses.includes(detail?.status as string)) {
         return false;
      }

      const today = new Date();
      const deadline = new Date(thisPeriod?.secondSubmissionDeadline as string);

      return today < deadline;
   };

   useEffect(() => {
      if (id) {
         dispatch(getContributionById(id));
         dispatch(getPeriod());
         dispatch(getFeedbackByContributionId(id));
      }
   }, [dispatch, id]);

   return (
      <div className="w-[calc(100vw-208px)] ">
         <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
            <div className="flex flex-col gap-5 lg:grid lg:grid-cols-5 lg:gap-3 justify-center items-start mt-5 w-full">
               <div className="w-full h-fit bg-white px-8 py-10 rounded-lg shadow-md lg:col-span-3">
                  {message && <span className="text-green-400">{message}</span>}
                  <div className="flex justify-between items-center">
                     <h2 className="text-2xl font-semibold mb-4">
                        Contribution
                     </h2>
                     <div className="h-5 w-20">
                        <Status status={detail?.status} />
                     </div>
                  </div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                     <Input
                        required
                        register={register}
                        id="Title"
                        label="Title"
                        type="text"
                        value={detail?.title}
                        disabled={!disableUpdate()}
                     ></Input>
                     <Input
                        required
                        register={register}
                        id="Description"
                        label="Description"
                        type="text"
                        value={detail?.description}
                        disabled={!disableUpdate()}
                     ></Input>
                     <Input
                        register={register}
                        errors={errors}
                        id="ImageFile"
                        label="Image"
                        type="file"
                        accept="image/*"
                        labelForLink="Current image"
                        link={detail?.coverImageUrl}
                        disabled={!disableUpdate()}
                     ></Input>
                     <Input
                        register={register}
                        errors={errors}
                        required
                        id="DocumentFile"
                        label="Document"
                        type="file"
                        accept=".pdf"
                        labelForLink="Current document"
                        link={detail?.documentUrl}
                        disabled={!disableUpdate()}
                     ></Input>

                     <div className="w-full flex justify-center mt-5">
                        <button
                           type="submit"
                           className={clsx(
                              " text-white px-4 py-2 rounded-lg w-[280px]",
                              disableUpdate()
                                 ? "bg-blue-500 hover:bg-blue-600"
                                 : "bg-blue-400",
                           )}
                           disabled={!disableUpdate()}
                        >
                           Update
                        </button>
                     </div>
                  </form>
               </div>
               <div className="lg:col-span-2 w-full">
                  <FeedbackList />
               </div>
            </div>
         </div>
      </div>
   );
};

export default UpdateContribution;
