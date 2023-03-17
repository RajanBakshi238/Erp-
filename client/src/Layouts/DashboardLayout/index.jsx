import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext/context";
import useRefershToken from "../../hooks/auth/useRefershToken";

import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

const DashboardLayout = () => {
  const { auth } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useAxiosPrivate();

  const refresh = useRefershToken();
  const [isLoading, setIsLoading] = useState(true);
  // will implement persist logic here only.
  let persist = false;

  console.log(location, "?>>>>>>>>>>>>>navigate>>>>>");

  useEffect(() => {
    if (!persist && !isLoading) {
      if (location.pathname === "/login" && auth.accessToken) {
        console.log(auth, "AUTHAUTHAUTHAUTHAUTHAUTHAUTHAUTHAUTH");
        navigate("/");
      } else {
        console.log(">>>>>>>>>>>>>>>else");
        navigate(location.pathname);
      }
    }
  }, [isLoading]);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err, "error for persisting");
      } finally {
        setIsLoading(false);
      }
    };

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {persist ? (
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
      ) : isLoading ? (
        <p>Loading.........</p>
      ) : (
        <div>
          {/* {auth?.user && location.pathname !== "/login"? ( */}
          {auth?.user ? (
            //Allow access to only logged in users.
            <>
              Dashboard Layout
              <Outlet />
            </>
          ) : 
            <Navigate to="/login" />
          }
        </div>
      )}
    </>
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
