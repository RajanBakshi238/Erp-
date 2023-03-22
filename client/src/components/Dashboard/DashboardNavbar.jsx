import React from "react";
import {BiMenu} from  "react-icons/bi"

import { Logo } from "../../constants/images";

const DashboardNavbar = () => {
  return (
    <nav className="min-h-[60px] fixed top-0 left-0 w-full bg-white z-10">
      <div className="px-2 flex ">
        <div className="w-[280px] -mx-2 h-full p-[6px] border-r-[#e3cfcf] border-r">
          <img src={Logo} alt="comp_logo" className="w-32 h-12 my-0 mx-auto" />
        </div>
        <div className="px-3 flex items-center">
          <div className="ml-3">
            <BiMenu className="w-8 h-8" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
