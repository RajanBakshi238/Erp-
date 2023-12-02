import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "../../Pages/404/NotFound";
import BreadCrumb from "./BreadCrumb";
import style from "./Dashboard.module.css";

import { useAuth } from "../../context/AuthContext/context";

// this one will come from backend ...... [api to be made]

import routes from "../../constants/routes";

// checks:
// 1.  user will have access to only routes which are allowed for his role ----i.e see from backend data
//  2. this role based route protection check should be made dynamic in backend side also.
//  3. May be in future it is required to do if there is no checkName in routes then it is available to all .

const DashboardContent = () => {
  // taking static should be made dynamic
  // let role = "user";

  const { authObj } = useAuth();


  const isAuthorized = (route) => {
    return authObj?.auth?.user?.permissions[route.checkName]?.includes(
      route.permissionType
    );
  };

  return (
    <div className={style["dashboard-content-box"]}>
      <div className="p-4 bg-[#ecf0f4]">
        {/* common breadcrumb */}
        <div>
          <BreadCrumb />
        </div>
        <Routes>
          {routes.map((route, index) => {
            if (
              !authObj?.auth?.user?.permissions?.[route.checkName] ||
              !isAuthorized(route)
            ) {
              return "";
            }

            // console.log(userRoutesData[route.checkName], '----', route.checkName, '----',userRoutesData[route.checkName]?.allowedTo)
            // console.log( !userRoutesData[route.checkName], 'llll' , !userRoutesData[route.checkName]?.allowedTo.includes(role))

            return (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            );
          })}

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardContent;
