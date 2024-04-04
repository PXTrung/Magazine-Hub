/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, startTransition, useEffect } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import useRedux from "../../hooks/useRedux";
import { getCurrentUser } from "../../redux/slices/authSlice";
import { getFaculty } from "../../redux/slices/facultySlice";
import Searchbar from "../../components/Searchbar";
import UserInformation from "../../pages/landing/components/UserInformation";
import { IUserInformation } from "../../types/user.type";
import { PATHS } from "../../constants/path";

const menu = {
  Contributor: [
    {
      lable: "Contribution",
      path: `contributor/${PATHS.CONTRIBUTION.IDENTITY}`,
    },
    {
      lable: "Contribute",
      path: `contributor/${PATHS.CONTRIBUTION.PERIOD_SELECT}`,
    },
  ],
  Admin: [{ lable: "Period", path: PATHS.CONTRIBUTION.IDENTITY }],
};

const RolePage = () => {
  const { dispatch, appSelector } = useRedux();
  const { userInfor } = appSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getFaculty());
  }, [dispatch]);

  return userInfor ? (
    <div className="flex flex-row justify-center items-center bg-slate-100">
      {/* Side bar */}
      <div className="w-56 min-h-screen fixed top-0 left-0 bg-white border-r border-slate-100 flex flex-col items-center justify-start pt-5">
        <div className="w-1/4 flex justify-center">
          <span className="text-3xl font-bold mb-10">LOGO</span>
        </div>
        <div className="flex flex-col justify-center items-start w-full px-5">
          {userInfor?.role === "Contributor" &&
            menu.Contributor.map((item) => {
              return (
                <Link
                  key={item.lable}
                  to={`/${item.path}`}
                  className="py-2 px-5 mb-2 bg-slate-100 w-full"
                >
                  <span>{item.lable}</span>
                </Link>
              );
            })}
        </div>
      </div>
      <div className="ml-56 w-full flex-1 flex flex-col justify-center items-start min-h-screen">
        {/* Top bar */}
        <div className="h-20 bg-white w-full flex justify-between items-center px-10 shadow-sm">
          <h1 className="text-gray-700 font-semibold text-lg">
            {userInfor?.role}
          </h1>
          <div className="w-[400px]">
            <Searchbar />
          </div>
          <div className="w-fit">
            <UserInformation data={userInfor as IUserInformation} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex w-full justify-center">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={`/${PATHS.HOME.IDENTITY}`} />
  );
};

export default RolePage;
