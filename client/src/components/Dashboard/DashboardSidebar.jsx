import React from "react";

import { BiHomeAlt } from "react-icons/bi";
import { MdOutlineTaskAlt } from "react-icons/md";
import { TbReportSearch } from "react-icons/tb";
import { FiTrello } from "react-icons/fi";
import { FaAngleRight } from "react-icons/fa";

import { Logo, UserPic } from "../../constants/images";

const DashboardSidebar = () => {
  return (
    <>
      <div className="sidebar fixed top-0 bottom-0 lg:left-0 w-[280px] overflow-y-auto text-center bg-white">
        <div className="p-2.5 mt-1 flex flex-col items-center justify-center">
          <span>
            <img src={Logo} alt="comp_logo" className="w-32 h-12" />
          </span>
          <div className="pt-[30px] pb-[10px]">
            <span className="w-32 h-32 block">
              <img src={UserPic} alt="user_pic" className="rounded-[10px]" />
            </span>
            <h4 className="text-[#060606] text-sm pt-2 font-medium">
              Sarah Smith
            </h4>
            <p className="text-[#000] text-xs pt-2">Admin</p>
          </div>
        </div>
        <div className="mt-4 text-left">
          {/* nav title */}
          <div className="mt-3 mb-2 ml-5 py-2 text-xs text-black">
            <h5 className="tracking-[.5px]">MAIN</h5>
          </div>
          {/* nav item */}

          <div className="mt-3 mb-2 ml-2 py-2 mr-2 pl-2 text-black hover:bg-[#f0f3fb]">
            <a href="#" className="flex items-center">
              <BiHomeAlt className="h-[18px] w-[18px]" />
              <span className="text-[#333] ml-2 font-medium">Home</span>
            </a>
          </div>
          <div className="mt-3 mb-2 ml-2 py-2 mr-2 pl-2 text-black hover:bg-[#f0f3fb]">
            <a href="#" className="flex items-center ">
              <TbReportSearch className="h-[18px] w-[18px]" />
              <span className="text-[#333] ml-2 font-medium">Reports</span>
            </a>
          </div>
          <div className="mt-3 mb-2 ml-2 py-2 mr-2 pl-2 text-black hover:bg-[#f0f3fb]">
            <a href="#" className="flex items-center ">
              <MdOutlineTaskAlt className="h-[18px] w-[18px]" />
              <span className="text-[#333] ml-2 font-medium">Task</span>
            </a>
          </div>
          {/* nav group */}

          <div>
            <div className="mt-3 mb-2 ml-2 py-2 mr-2 pl-2 text-black hover:bg-[#f0f3fb]">
              <a href="#" className="flex items-center ">
                <FiTrello className="h-[18px] w-[18px]" />
                <span className=" text-[#333] ml-2 font-medium">
                  Leave Management
                </span>
                <FaAngleRight class="ml-4" />
              </a>
            </div>
            <div class="hidden">
              <div className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]">
                <a href="#" className="">
                  {/* <FiTrello className="h-[18px] w-[18px]" /> */}
                  <span className="text-sm text-[#333] ml-2 font-medium">
                    User Leave Management
                  </span>
                </a>
              </div>
              <div className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]">
                <a href="#" className="">
                  {/* <FiTrello className="h-[18px] w-[18px]" /> */}
                  <span className="text-sm text-[#333] ml-2 font-medium">
                    Apply Leave
                  </span>
                </a>
              </div>
              <div className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]">
                <a href="#" className="">
                  {/* <FiTrello className="h-[18px] w-[18px]" /> */}
                  <span className="text-sm text-[#333] ml-2 font-medium">
                    Leave Records
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
