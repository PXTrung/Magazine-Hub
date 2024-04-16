import React, { useEffect, useState } from "react";
import "flowbite";
import ApexCharts from "apexcharts";
import { IFacultyContribution } from "../../../../types/dashboard.type";

interface IBarChartProps {
   chartData: IFacultyContribution[];
   period: number | undefined;
}

const BarChart = ({ chartData, period }: IBarChartProps) => {
   const [chart, setChart] = useState<ApexCharts | null>(null);

   useEffect(() => {
      const columnChartElement = document.getElementById("column-chart");
      if (columnChartElement && typeof ApexCharts !== "undefined") {
         const publishedCounts: number[] = [];
         const approvedCounts: number[] = [];
         const rejectedCounts: number[] = [];
         const facultyNames: string[] = [];

         chartData?.forEach((item) => {
            publishedCounts.push(item.publishedCount);
            approvedCounts.push(item.approvedCount);
            rejectedCounts.push(item.rejectedCount);
            facultyNames.push(item.facultyName);
         });

         const options = {
            series: [
               {
                  name: "Approved",
                  color: "#16BDCA",
                  data: approvedCounts,
               },
               {
                  name: "Published",
                  color: "#1C64F2",
                  data: publishedCounts,
               },
               {
                  name: "Rejected",
                  color: "#E74694",
                  data: rejectedCounts,
               },
            ],
            chart: {
               type: "bar",
               height: "340px",
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
                  borderRadius: 8,
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
                     cssClass:
                        "text-xs font-normal fill-gray-500 dark:fill-gray-400",
                  },
               },
               axisBorder: {
                  show: false,
               },
               axisTicks: {
                  show: false,
               },
               categories: facultyNames,
            },
            yaxis: {
               show: false,
            },
            fill: {
               opacity: 1,
            },
         };

         columnChartElement.innerHTML = "";

         const newChart = new ApexCharts(columnChartElement, options);
         setChart(newChart);
      }
   }, [chartData]);

   useEffect(() => {
      if (chart) {
         chart.render();
      }
   }, [chart]);

   return (
      <div className=" w-full bg-white rounded-lg shadow p-4 md:p-6 lg:col-span-2">
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
               <div className="ml-2">
                  <h5 className="leading-none text-lg lg:text-2xl font-bold text-gray-800 dark:text-white pb-1">
                     Contributions
                  </h5>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                     In period {period}
                  </p>
               </div>
            </div>
         </div>

         <div id="column-chart"></div>
      </div>
   );
};

export default BarChart;
