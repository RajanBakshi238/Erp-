import React, { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext/context";
import useRefershToken from "../../hooks/auth/useRefershToken";

import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";


const   DashboardLayout = () => {
  const { auth } = useAuth();

  useAxiosPrivate();


  // const refresh = useRefershToken();
  // const [isLoading, setIsLoading] = useState(true);
  // // will implement persist logic here only.
  // let persist = false;

  // useEffect(() => {
  //   const verifyRefreshToken = async () => {
  //     try {
  //       await refresh();
  //     } catch (err) {
  //       console.log(err, "error for persisting");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  //   !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  // }, []);

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
    // <div>
    //   {auth?.user ? (
    //     //Allow access to only logged in users.
    //     <>
    //       Dashboard Layout
    //       <Outlet />
    //     </>
    //   ) : (
    //     <Navigate to="/login" />
    //   )}
    // </div>
  );
};

export default DashboardLayout;

{
  /* <>
      {!persist ? (
        <div>
          {auth?.user ? (
            //Allow access to only logged in users.
            <>
              Dashboard Layout
              <Outlet />
            </>
          ) : (
            <Navigate to="/test" />
          )}
        </div>
      ) : isLoading ? (
        <p>Loading.........</p>
      ) : (
        <div>
          {auth?.user ? (
            //Allow access to only logged in users.
            <>
              Dashboard Layout
              <Outlet />
            </>
          ) : (
            <Navigate to="/test" />
          )}
        </div>
      )}
    </> */
}
