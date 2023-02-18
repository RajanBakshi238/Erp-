import React from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext/context";

const DashboardLayout = () => {
  const { auth } = useAuth();

  return (
    <div>
      {auth?.user ? (
        //Allow access to only logged in users.
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
