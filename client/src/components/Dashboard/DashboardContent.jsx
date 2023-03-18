import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../Pages/Dashboard";

const DashboardContent = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default DashboardContent;
