import React from "react";

const PageCard = ({ children }) => {
  return (
    <div className="p-3 border-2 bg-white rounded-md text-black">
      {children}
    </div>
  );
};

export default PageCard;
