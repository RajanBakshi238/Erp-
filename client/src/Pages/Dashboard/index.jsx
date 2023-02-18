import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div>Dashboard</div>
      <div>
        <Link to="/test">navigate test</Link>
      </div>
    </>
  );
};

export default Dashboard;
