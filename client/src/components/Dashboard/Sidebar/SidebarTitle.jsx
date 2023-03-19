import React from "react";

const SidebarTitle = ({title}) => {
  return (
    <div className="mt-3 mb-2 ml-5 py-2 text-xs text-black">
      <h5 className="tracking-[.5px]">{title}</h5>
    </div>
  );
};

export default SidebarTitle;
