import React from "react";

const SidebarItem = ({Icon, title}) => {
  return (
    <div className="mt-3 mb-2 ml-2 py-2 mr-2 pl-2 text-black hover:bg-[#f0f3fb]">
      <a href="#" className="flex items-center">
        <Icon className="h-[18px] w-[18px]" />
        <span className="text-[#333] ml-2 font-medium">{title}</span>
      </a>
    </div>
  );
};

export default SidebarItem;
