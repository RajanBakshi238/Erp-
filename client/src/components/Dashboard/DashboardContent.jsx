import React from "react";
import { Route, Routes } from "react-router-dom";

// this one will come from backend ...... [api to be made]
import { userRoutesData } from "../../demo_data";

import routes from "../../constants/routes";


// checks: 
// 1.  user will have access to only routes which are allowed for his role ----i.e see from backend data
//  2. this role based route protection check should be made dynamic in backend side also.
//  3. May be in future it is required to do if there is no checkName in routes then it is available to all .


const DashboardContent = () => {
// taking static should be made dynamic
    let role = 'user'


  return (
    <Routes>
      {routes.map((route, index) => {

        if( !userRoutesData[route.checkName] || !userRoutesData[route.checkName]?.allowedTo.includes(role)){
            console.log(userRoutesData[route.checkName], '----', route.checkName, '----',userRoutesData[route.checkName]?.allowedTo)
            return ''
        }

        // console.log(userRoutesData[route.checkName], '----', route.checkName, '----',userRoutesData[route.checkName]?.allowedTo)
        // console.log( !userRoutesData[route.checkName], 'llll' , !userRoutesData[route.checkName]?.allowedTo.includes(role))


        return <Route key={index} path={route.path} element={<route.element />} />;
      })}

      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default DashboardContent;
