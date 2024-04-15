import React, { useEffect, useState } from "react";
import Loading from "../../../../components/loading/Loading";
import "flowbite";
import ApexCharts from "apexcharts";
import Card from "../../../../components/Dashboard/Card";
import DashboardTable from "./DashboardTable";

const Dashboard = () => {
   const [chart, setChart] = useState<ApexCharts | null>(null);
   useEffect(() => {
      if (
         document.getElementById("column-chart") &&
         typeof ApexCharts !== "undefined"
      ) {
         const options = {
            series: [
               {
                  name: "Contribution",
                  data: [
                     { x: "Published", y: 421 },
                     { x: "Approved", y: 231 },
                     { x: "Processed", y: 122 },
                     { x: "Processing", y: 63 },
                     { x: "Rejected", y: 122 },
                  ],
               },
            ],
            chart: {
               type: "bar",
               height: "320px",
               fontFamily: "Inter, sans-serif",
               toolbar: {
                  show: false,
               },
            },

            plotOptions: {
               bar: {
                  horizontal: false,
                  columnWidth: "30%",
                  borderRadiusApplication: "end",
                  borderRadius: 2,
               },
            },
            tooltip: {
               shared: true,
               intersect: false,
               style: {
                  fontFamily: "Inter, sans-serif",
               },
            },
            states: {
               hover: {
                  filter: {
                     type: "darken",
                     value: 1,
                  },
               },
            },
            stroke: {
               show: true,
               width: 0,
               colors: ["transparent"],
            },
            grid: {
               show: false,
               strokeDashArray: 4,
               padding: {
                  left: 2,
                  right: 2,
                  top: -14,
               },
            },
            dataLabels: {
               enabled: false,
            },
            legend: {
               show: false,
            },
            xaxis: {
               floating: false,
               labels: {
                  show: true,
                  style: {
                     fontFamily: "Inter, sans-serif",
                     cssClass: "text-xs font-normal fill-gray-500",
                  },
               },

               axisBorder: {
                  show: false,
               },
               axisTicks: {
                  show: false,
               },
            },
            yaxis: {
               show: false,
            },
            fill: {
               opacity: 1,
            },
         };

         const newChart = new ApexCharts(
            document.getElementById("column-chart"),
            options,
         );
         setChart(newChart);
      }
   }, []);

   useEffect(() => {
      if (chart) {
         chart.render();
      }
   }, [chart]);

   return (
      <div className="w-[calc(100vw-208px)] ">
         {/* {isLoading && <Loading />} */}
         <div className="px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 xl:gap-5 mb-5">
               <Card label="Top 1 Contributor" value={"Nguyen Van A"} icon="top"/>
               <Card label="Total contributions" value={"50"} icon="total-contributions"/>
               <Card label="Total published" value={"16"} icon="total-published"/>
               <Card label="Feedback" value={"50%"} icon="feedback"/>
            </div>
            <div className="w-full flex flex-col lg:grid lg:grid-cols-5 gap-5 ">
               <div className="lg:max-w-lg w-full bg-white rounded-lg shadow p-4 md:p-6 lg:col-span-2">
                  <div className="flex justify-between pb-4 mb-4 border-b border-gray-200 dark:border-gray-700">
                     <div className="flex items-center">
                        <div className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center me-3">
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z"
                              />
                           </svg>
                        </div>
                        <div>
                           <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-1">
                              Contributions
                           </h5>
                           <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                              In period: 2024
                           </p>
                        </div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2">
                     <dl className="flex items-center">
                        <dt className="text-gray-500 dark:text-gray-400 text-sm font-normal me-1">
                           Total contributions:
                        </dt>
                        <dd className="text-gray-900 text-sm dark:text-white font-semibold">
                           50
                        </dd>
                     </dl>
                  </div>

                  <div id="column-chart"></div>
               </div>
               <div className="lg:col-span-3 min-h-80">
                  <DashboardTable name="Top contributor"/>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Dashboard;
