import React from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext/context";

const Dashboard = () => {
  const { auth } = useAuth();

  console.log(
    auth,
    "checking auth object for applying role based authentication"
  );

  return (
    <>
      <div>Dashboardjkkkjdbjcbdbhbc bd cb cbc cb chchd hcdhhd h d</div>
      <hr />
      <br />
      <div style={{width: "500px", overflow: "scroll"}}>
        {JSON.stringify(auth)}
      </div>





      

      {/* <div>
        <Link to="/test">navigate test</Link>
      </div> */}
    </>
  );
};

export default Dashboard;
