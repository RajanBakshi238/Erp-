import React from "react";
import { Route, Routes } from "react-router-dom";

import Dashboard from "../../Pages/Dashboard";

// this one will come from backend ...... [api to be made]
import { userRoutesData } from "../../demo_data";

import routes from "../../routes";

const DashboardContent = () => {
  return (
    <Routes>
      {routes.map((route, index) => {
        return <Route key={index} path={route.path} element={<route.element />} />;
      })}

      {/* <Route path="/dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default DashboardContent;
