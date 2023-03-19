import React, { useState } from "react";
import classnames from "classnames";

import { FaAngleRight } from "react-icons/fa";

const SidebarGroup = ({ Icon, title, subTitle }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div className="mt-3 mb-2 ml-2 py-2 mr-2 pl-2 text-black hover:bg-[#f0f3fb]">
        <a
          href="#"
          className="flex items-center"
          onClick={() => setOpen(!open)}
        >
          <Icon className="h-[18px] w-[18px]" />
          <span className=" text-[#333] ml-2 font-medium">{title}</span>
          <FaAngleRight
            class={classnames([
              "ml-11",
              "ease-in duration-300",
              { "rotate-90": !open },
            ])}
          />
        </a>
      </div>
      <div class={classnames([{ hidden: open }])}>
        {subTitle.map((subGroup, index) => {
          return (
            <div
              className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]"
              key={index}
            >
              <a href="#" className="">
                <span className="text-sm text-[#333] ml-2 font-medium">
                  {subGroup}
                </span>
              </a>
            </div>
          );
        })}
        {/* <div className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]">
          <a href="#" className="">
            <span className="text-sm text-[#333] ml-2 font-medium">
              User Leave Management
            </span>
          </a>
        </div> */}
        {/* <div className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]">
          <a href="#" className="">
            
            <span className="text-sm text-[#333] ml-2 font-medium">
              User Leave Management
            </span>
          </a>
        </div>
        <div className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]">
          <a href="#" className="">
            
            <span className="text-sm text-[#333] ml-2 font-medium">
              Apply Leave
            </span>
          </a>
        </div>
        <div className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]">
          <a href="#" className="">
            
            <span className="text-sm text-[#333] ml-2 font-medium">
              Leave Records
            </span>
          </a>
        </div> */}
      </div>
    </div>
  );
};

export default SidebarGroup;
