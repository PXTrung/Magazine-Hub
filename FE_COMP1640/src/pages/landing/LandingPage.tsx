import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import Header from "./components/Header";

const LandingPage = () => {
   return (
      <div className="w-screen min-h-screen bg-slate-100">
         <Header />
      </div>
   );
};

export default LandingPage;
