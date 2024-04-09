import React, { useEffect } from "react";
import { getPeriod } from "../../redux/slices/periodSlide";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/store";
import { Link } from "react-router-dom";
import formatDate from "../../utils/functions";

const Period = () => {
  const { dispatch, appSelector } = useRedux();
  const periods = appSelector((state: RootState) => state.period);

  useEffect(() => {
    dispatch(getPeriod());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-3 mt-8 p-4 w-full">
      {periods.period.map((p) => (
        <Link to={`${p.id}`}>
          <button
            type="button"
            className="py-4 px-8 text-gray-600 rounded-md bg-white text-center flex flex-col shadow hover:shadow-md transition-all duration-200"
          >
            <div>
              <span className="font-medium mr-2">Academy year:</span>
              <span>{p.academicYear}</span>
            </div>
            <div>
              <span className="font-medium mr-2">First deadline:</span>
              <span>{formatDate(p.firstSubmissionDeadline)}</span>
            </div>
            <div>
              <span className="font-medium mr-2">Second deadline:</span>
              <span>{formatDate(p.secondSubmissionDeadline)}</span>
            </div>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default Period;
