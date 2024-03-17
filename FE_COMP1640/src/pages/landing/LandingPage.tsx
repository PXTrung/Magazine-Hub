import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";

const LandingPage = () => {
   return (
      <div className="m-4">
         <div>this is home page for guest</div>
         <button className="w-36 rounded border p-2 mt-4 bg-blue-600 text-white">
            <Link to={`/auth/${PATHS.AUTH.LOGIN}`}>click to Login</Link>
         </button>
      </div>
   );
};

export default LandingPage;
