import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div>
      {true ? (
        <>
          Dashboard Layout
          <Outlet />
        </>
      ) : (
        <Navigate to="/login" />
      )}
    </div>
  );
};

export default DashboardLayout;
