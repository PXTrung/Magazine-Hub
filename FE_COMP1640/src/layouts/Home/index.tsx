import React, { Suspense } from "react";
import Header from "../../pages/landing/components/Header";
import Footer from "../../pages/landing/components/Footer";
import { Outlet } from "react-router-dom";

const Home = () => {
   return (
      <div className="relative w-screen pr-[5px] min-h-screen bg-gray-100 overflow-hidden flex flex-col justify-center items-center">
         <Header />
         <Suspense>
            <Outlet />
         </Suspense>
         <Footer />
      </div>
   );
};

export default Home;
