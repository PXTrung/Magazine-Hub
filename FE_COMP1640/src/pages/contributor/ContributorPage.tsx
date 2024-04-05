/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useRedux from "../../hooks/useRedux";
import { getContributionListWithToken } from "../../redux/slices/contributionSlice";
import { getPeriod } from "../../redux/slices/periodSlide";
import { RootState } from "../../redux/store";
import { useLocation } from "react-router-dom";
import Table from "./ContributionTable/Table";

const status = [
  "All",
  "Approved",
  "Processing",
  "Processed",
  "Rejected",
  "Published",
];

interface IFilters {
  status: string | "";
  period: string | "";
}

const ContributorPage = () => {
  const { appSelector, dispatch } = useRedux();
  const { userInfor } = appSelector((state) => state.auth);
  const { list } = appSelector((state) => state.contribution);
  const { period } = appSelector((state) => state.period);
  const [filter, setFilter] = useState<IFilters>({ period: "", status: "" });
  const location = useLocation();

  useEffect(() => {
    dispatch(
      getContributionListWithToken({
        filters: { email: userInfor?.email },
        page: 1,
        pageSize: 10,
      })
    );
  }, [dispatch, userInfor, location.pathname]);

  useEffect(() => {
    dispatch(
      getContributionListWithToken({
        filters: { status: filter.status, period: filter.period },
        page: 1,
        pageSize: 10,
      })
    );
  }, [filter]);

  useEffect(() => {
    dispatch(getPeriod());
  }, [filter]);

  return (
    <div className="w-full md:w-full lg:w-[960px] xl:w-[1200px] py-5 ">
      <div className="w-full flex justify-start items-center pb-5">
        <div className="mr-3">
          <label htmlFor="status" className="text-sm text-gray-600">
            Status
          </label>
          <select
            id="status"
            className="block appearance-none w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
            defaultValue={"All"}
            onChange={(event) => {
              setFilter({ ...filter, status: event.target.value });
            }}
          >
            {status?.map((item) => {
              return (
                <option key={item} value={item}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor="period" className="text-sm text-gray-600">
            Period
          </label>
          <select
            id="period"
            className="block appearance-none w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
            defaultValue={"All"}
            onChange={(event) => {
              setFilter({ ...filter, period: event.target.value });
            }}
          >
            {period?.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.academicYear}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <Table data={list} name="My contribution" />
    </div>
  );
};

export default ContributorPage;
