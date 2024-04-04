import React, { useEffect } from "react";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/store";
import { getPeriod } from "../../redux/slices/periodSlide";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";

const PeriodSelector = () => {
  const { dispatch, appSelector } = useRedux();
  const periods = appSelector((state: RootState) => state.period);

  useEffect(() => {
    dispatch(getPeriod());
  }, [dispatch]);

  return (
    <div className="flex flex-row mt-8 p-4 w-full">
      <div>
        {periods.period.map((p) => (
          <Link to={`${PATHS.CONTRIBUTION.CREATE}/${p.id}`}>
            <button
              type="button"
              className="py-2 px-8 text-slate-200 rounded-lg bg-cyan-500 text-center ml-8"
            >
              {p.academicYear}
            </button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PeriodSelector;
