/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { IContributionDetail } from "../../types/contribution.type";
import clsx from "clsx";
import Status from "../Contribution/Status";
import formatDate from "../../utils/functions";

interface IRowProps {
   contribution?: IContributionDetail;
   label?: string[];
}

const Row = ({ contribution, label }: IRowProps) => {
   return (
      <div className="grid grid-cols-12 items-center gap-3 py-4 bg-white border-t border-t-slate-200">
         <span className="col-span-3 truncate">{contribution?.title}</span>
         <span className="col-span-4 truncate">
            {contribution?.description}
         </span>
         <img
            src={contribution?.coverImageUrl}
            alt="cover image"
            className="col-span-1 truncate h-8 object-contain"
         />

         <span className="col-span-3 truncate">
            {formatDate(contribution?.createdAt || "")}
         </span>
         <div className="h-full col-span-1 text-center truncate">
            <Status status={contribution?.status} />
         </div>
      </div>
   );
};

export default Row;
