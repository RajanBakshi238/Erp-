import React from "react";
import {IoEllipsisVerticalSharp} from "react-icons/io5"

import PageCard from "../../components/Common/PageCard";

const Task = () => {
  return (
    <PageCard>
      <div className="py-2">
        <h1 className="font-semibold text-lg">Tasks</h1>
      </div>
      <div className="py-2 overflow-x-scroll">
        <div className="flex justify-between py-3 px-2 border border-[#c1c1c1] rounded font-medium text-[#9c9c9c] mb-3 min-w-[1040px]">
            <div className="w-[200px]">Task Name</div>
            <div className="w-[200px]">Task Description </div>
            <div className="w-[200px]">Assigned Date</div>
            <div className="w-[200px]">Assigned By</div>
            <div className="w-[200px]">Action</div>
        </div>
        <div className="flex justify-between py-3 px-2 border border-[#c1c1c1] rounded text-[#252424] mb-3 min-w-[1040px] items-center">
            <div className="w-[200px]">Working On Ui</div>
            <div className="w-[200px]">Ui bugs fixing and making new page dummy test </div>
            <div className="w-[200px]">April, 1st, 2023</div>
            <div className="w-[200px]">Jaykant Bakshi</div>
            <div className="w-[200px] " ><IoEllipsisVerticalSharp className="w-[24px] h-[24px] text-black cursor-pointer" /></div>
        </div>
        <div className="flex justify-between py-3 px-2 border border-[#c1c1c1] rounded text-[#252424] mb-3 min-w-[1040px] items-center">
            <div className="w-[200px]">Working On Ui</div>
            <div className="w-[200px]">Ui bugs fixing  </div>
            <div className="w-[200px]">April, 1st, 2023</div>
            <div className="w-[200px]">Jaykant Bakshi</div>
            <div className="w-[200px] " ><IoEllipsisVerticalSharp className="w-[24px] h-[24px] text-black cursor-pointer" /></div>
        </div>
      </div>
    </PageCard>
  );
};

export default Task;
