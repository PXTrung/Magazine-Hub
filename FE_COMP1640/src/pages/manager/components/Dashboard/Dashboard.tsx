/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../../../components/loading/Loading";
import "flowbite";
import Card from "../../../../components/Dashboard/Card";
import DashboardTable from "./DashboardTable";
import useRedux from "../../../../hooks/useRedux";
import { getManagerDashboard } from "../../../../redux/slices/dashboardSlice";
import { getPeriod } from "../../../../redux/slices/periodSlide";
import { useSearchParams } from "react-router-dom";
import BarChart from "./BarChart";

const Dashboard = () => {
   const { appSelector, dispatch } = useRedux();
   const [current, setCurrent] = useState<string>();
   const [searchParams, setSearchParams] = useSearchParams();
   const { managerDashboard, isLoading } = appSelector(
      (state) => state.dashboard,
   );
   const { period } = appSelector((state) => state.period);

   const setParams = (key: string, value: string | number) => {
      setSearchParams((prevParams) => {
         if (
            value === null ||
            value === "" ||
            value === undefined ||
            Number.isNaN(value)
         ) {
            prevParams.delete(key);
         } else {
            prevParams.set(key, value as string);
         }
         return prevParams;
      });
   };

   useEffect(() => {
      dispatch(getPeriod());
      if (!searchParams.get("period")) setParams("period", period[0]?.id);
   }, [dispatch]);

   useEffect(() => {
      const period = searchParams.get("period") as string;
      dispatch(getManagerDashboard(period));
   }, [dispatch, searchParams]);

   useEffect(() => {
      const param = searchParams.get("period");
      if (param) {
         const temp = period.find((item) => item.id === param);
         setCurrent(temp?.id);
      } else setCurrent("");
   }, [searchParams, period]);

   const renderChart = useMemo(() => {
      let data = Object.entries(
         managerDashboard?.percentageOfContributionByStatus || {},
      );

      const chartData = data?.map(([status, value]) => ({
         x: status,
         y: value,
      }));

      return (
         <BarChart
            period={
               period.find((item) => item.id === searchParams.get("period"))
                  ?.academicYear + ""
            }
            chartData={chartData}
         />
      );
   }, [managerDashboard, searchParams]);

   return (
      <div className="w-[calc(100vw-208px)] ">
         {isLoading && <Loading />}
         <div className="px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
            <div className="mr-3 mb-5">
               <label htmlFor="period" className="text-sm text-gray-600">
                  Period
               </label>
               <select
                  id="period"
                  className="block appearance-none w-40 lg:w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
                  value={current}
                  onChange={(event) => {
                     setParams("period", event.target.value);
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

            <div className="grid md:grid-cols-3 gap-2 lg:gap-5 xl:gap-5 mb-5">
               {/* {Object.entries(
                  managerDashboard?.facultyRankByContribution || {},
               )?.map(([key, value]) => (
                  <Card icon={key} value={value.toString()} label={key} />
               ))} */}
               <Card
                  label="Contributions"
                  value={managerDashboard?.totalOfContribution + ""}
                  icon="total-contributions"
               />
               <Card
                  label="Published"
                  value={managerDashboard?.totalOfPublishedContribution + ""}
                  icon="total-published"
               />
               <Card
                  label="Feedback"
                  value={
                     managerDashboard?.percentageOfFeedbackedContribution + "%"
                  }
                  icon="feedback"
               />
            </div>
            <div className="w-full flex flex-col lg:grid lg:grid-cols-5 gap-5 ">
               {renderChart}

               <div className="lg:col-span-3 min-h-80">
                  <DashboardTable
                     name="In faculty"
                     data={
                        managerDashboard?.numberOfContributionByStatusWithinFaculty
                     }
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
