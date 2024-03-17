import React, { useEffect } from "react";

const Loading = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
   });
   return (
      <div className="h-screen">
         <svg
            className="animate-spin h-5 w-5 mr-3 ..."
            viewBox="0 0 24 24"
         ></svg>
      </div>
   );
};

export default Loading;
