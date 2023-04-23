import React, { useState } from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";

import { FaAngleRight } from "react-icons/fa";
// This will come from backend
import { userRoutesData } from "../../../demo_data";
import { useAuth } from "../../../context/AuthContext/context";


const SidebarGroup = ({ Icon, title, subItem }) => {
  const [open, setOpen] = useState(true);
  const { authObj } = useAuth();
  // This will also come from backend
  // let role = "user";

  // check subItem i.e there should be one active from backend to show heading of sub group in front end
  const checkSubItem = () => {
    let check = subItem.find(
      (item) =>
        authObj.assignedFeatures?.[item.checkName] &&
        authObj.assignedFeatures?.[item.checkName]?.allowedTo.includes(authObj?.auth?.user?.role)
    );
    return check;
  };

  if (!checkSubItem()) {
    return "";
  }

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
          <div className="ml-auto">
            <FaAngleRight
              className={classnames([
                "ml-auto",
                "ease-in duration-300",
                { "rotate-90": !open },
              ])}
            />
          </div>
        </a>
      </div>
      <div className={classnames([{ hidden: open }])}>
        {subItem.map((item, index) => {
          if (
            !authObj.assignedFeatures[item.checkName] ||
            !authObj.assignedFeatures[item.checkName]?.allowedTo.includes(authObj?.auth?.user?.role)
          ) {
            return "";
          }

          return (
            <div
              className="mt-2 mb-2 ml-4 py-2 mr-2 pl-4 text-black hover:bg-[#f0f3fb]"
              key={index}
            >
              <Link to={item.path} className="">
                <span className="text-sm text-[#333] ml-2 font-medium">
                  {item.name}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SidebarGroup;
