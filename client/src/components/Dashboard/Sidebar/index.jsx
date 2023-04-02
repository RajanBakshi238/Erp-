import React from "react";

import SidebarTitle from "./SidebarTitle";
import SidebarItem from "./SidebarItem";
import SidebarGroup from "./SidebarGroup";
// this will come from backend
import { userRoutesData } from "../../../demo_data";
import { Logo, UserPic } from "../../../constants/images";
import _nav from "./../../../constants/_nav";
import { useAuth } from "../../../context/AuthContext/context";

const DashboardSidebar = () => {
  const { authObj } = useAuth();
  // let role = "user";

  const getSideBarData = () => {
    return _nav.map((item, index) => {
      if (item.type === "title") {
        // here may be in upcomming time the check is required
        return <SidebarTitle title={item.name} />;
      } else if (
        item.type === "side_item" &&
        authObj.assignedFeatures?.[item.checkName]
      ) {
        if (
          !authObj.assignedFeatures[item.checkName] ||
          // !authObj.assignedFeatures[item.checkName]?.allowedTo.includes(role)
          !authObj.assignedFeatures[item.checkName]?.allowedTo.includes(
            authObj?.auth?.user?.role
          )
        ) {
          return "";
        }

        return (
          <SidebarItem title={item.name} Icon={item.Icon} path={item.path} />
        );
      } else if (item.type === "side_group") {
        console.log(">>>>>>>>>>>>>>side_group>>>>>>>");

        return (
          <SidebarGroup
            title={item.name}
            Icon={item.Icon}
            subItem={item.subItem}
          />
        );
      }

      return "";
    });
  };

  return (
    <>
      <div className="sidebar bottom-0 lg:left-0 w-[280px] overflow-y-auto text-center bg-white fixed top-[60px]">
        <div className="p-2.5 mt-1 flex flex-col items-center justify-center">
          {/* <span>
            <img src={Logo} alt="comp_logo" className="w-32 h-12" />
          </span> */}
          <div className="pt-4 pb-[10px]">
            <span className="w-24 h-24 block">
              <img src={UserPic} alt="user_pic" className="rounded-[10px]" />
            </span>
            <h4 className="text-[#060606] text-sm pt-2 font-medium">
              {authObj?.auth?.user?.name}
            </h4>
            <p className="text-[#000] text-xs pt-2 capitalize">{authObj?.auth?.user?.role}</p>
          </div>
        </div>
        <div className="mt-4 text-left">
          {/* nav title */}
          {getSideBarData()}

          {/* <SidebarTitle title="Home" /> */}

          {/* nav item */}

          {/* <SidebarItem title="Home" Icon={BiHomeAlt} />
          <SidebarItem title="Reports" Icon={TbReportSearch} />
          <SidebarItem title="Task" Icon={MdOutlineTaskAlt} /> */}

          {/* nav group */}
          {/* <SidebarGroup
            Icon={FiTrello}
            title="Leave Management"
            subItem={["User Leave Management", "Apply Leave", "Leave Records"]}
          /> */}
        </div>
      </div>
    </>
  );
};

export default DashboardSidebar;
