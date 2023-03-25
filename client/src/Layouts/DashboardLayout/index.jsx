import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext/context";
import useRefershToken from "../../hooks/auth/useRefershToken";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";

import {
  DashboardContent,
  DashboardNavbar,
  DashboardSidebar,
} from "../../components/Dashboard";



const DashboardLayout = () => {
  const { authObj } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();

  useAxiosPrivate();

  const refresh = useRefershToken();
  const [isLoading, setIsLoading] = useState(true);
  // will implement persist logic here only.
  let persist = false;

  useEffect(() => {
    if (!persist && !isLoading) {
      if (location.pathname === "/login" && authObj?.auth.accessToken) {
        navigate("/");
      } else {
        navigate(location.pathname);
      }
    }
  }, [isLoading]);

  useEffect(() => {

    console.log("called 1 --------------....>>>>>")


    const verifyRefreshToken = async () => {
      try {
        await refresh();
        // here impplementing the logic for getting assigned features.


      } catch (err) {
        console.log(err, "error for persisting");
      } finally {
        setIsLoading(false);
      }
    };

    !authObj?.auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  return (
    <>
      {persist ? (
        <div>
          {authObj?.auth?.user ? (
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
          {authObj?.auth?.user ? (
            //Allow access to only logged in users.
            <>
              <DashboardNavbar />
              <DashboardSidebar />

              <DashboardContent />
            </>
          ) : (
            <Navigate to="/login" />
          )}
        </div>
      )}
    </>
  );
};

export default DashboardLayout;
