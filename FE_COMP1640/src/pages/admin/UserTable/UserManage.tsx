/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import useRedux from "../../../hooks/useRedux";
import Table from "./Table";
import { useLocation } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import Loading from "../../../components/loading/Loading";
import { getUserList } from "../../../redux/slices/userSlice";
import { getRole } from "../../../redux/slices/roleSlice";

interface IFilters {
   facultyId: string;
   roleName: string | "";
}

const UserManage = () => {
   const location = useLocation();
   const { appSelector, dispatch } = useRedux();
   const { faculty } = appSelector((state) => state.faculty);
   const { role } = appSelector((state) => state.role);
   const { userInfor } = appSelector((state) => state.auth);
   const { list, currentPage, totalPage, isLoading } = appSelector(
      (state) => state.user,
   );
   const [filter, setFilter] = useState<IFilters>({
      facultyId: "",
      roleName: "",
   });
   const [current, setCurrent] = useState(currentPage | 1);

   const changePage = (page: number) => {
      setCurrent(page);
   };

   console.log(current);

   useEffect(() => {
      dispatch(getRole());
      dispatch(
         getUserList({
            filters: { facultyId: filter.facultyId, role: filter.roleName },
            page: current,
            pageSize: 10,
         }),
      );
   }, [dispatch, userInfor, location.pathname, filter, current]);

   return (
      <>
         {isLoading && <Loading />}
         <div className="w-full md:w-full lg:w-[960px] xl:w-[1200px] py-5 ">
            <div className="w-full flex justify-start items-center pb-5">
               <div className="mr-3">
                  <label htmlFor="falcuty" className="text-sm text-gray-600">
                     Faculty
                  </label>
                  <select
                     id="falcuty"
                     className="block appearance-none w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
                     defaultValue={"All"}
                     onChange={(event) => {
                        setFilter({ ...filter, facultyId: event.target.value });
                        changePage(1);
                     }}
                  >
                     <option key={"all"} value={""}>
                        {"All"}
                     </option>
                     {faculty?.map((item) => {
                        return (
                           <option key={item.id} value={item.id}>
                              {item.name}
                           </option>
                        );
                     })}
                  </select>
               </div>
               <div>
                  <label htmlFor="role" className="text-sm text-gray-600">
                     Role
                  </label>
                  <select
                     id="role"
                     className="block appearance-none w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
                     defaultValue={"All"}
                     onChange={(event) => {
                        setFilter({ ...filter, roleName: event.target.value });
                     }}
                  >
                     <option key={"all"} value={""}>
                        {"All"}
                     </option>
                     {role?.map((item) => {
                        return (
                           <option key={item.id} value={item.name}>
                              {item.name}
                           </option>
                        );
                     })}
                  </select>
               </div>
            </div>
            <Table data={list} name="Users" />
            <Pagination
               total={totalPage}
               current={current}
               setPage={changePage}
            />
         </div>
      </>
   );
};

export default UserManage;
