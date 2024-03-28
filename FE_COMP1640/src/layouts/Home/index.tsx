import React, { Suspense, useEffect } from "react";
import Header from "../../pages/landing/components/Header";
import Footer from "../../pages/landing/components/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { getCurrentUser } from "../../redux/slices/authSlice";

const Home = () => {
   const dispatch = useDispatch<AppDispatch>();
   useEffect(() => {
      dispatch(getCurrentUser());
   });

   return (
      <div className="relative w-screen pr-[5px] min-h-screen bg-gray-100 flex flex-col justify-start items-center">
         <Header />
         <Suspense>
            <Outlet />
         </Suspense>
         <Footer />
      </div>
   );
};

export default Home;
