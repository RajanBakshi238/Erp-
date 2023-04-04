import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Outlet, Navigate } from "react-router-dom";

import { getData } from "../../utils/api";

import { useAuth } from "../../context/AuthContext/context";
import useRefershToken from "../../hooks/auth/useRefershToken";
import useAxiosPrivate from "../../hooks/auth/useAxiosPrivate";
import style from "./DashboardLayout.module.css";

import {
  DashboardContent,
  DashboardNavbar,
  DashboardSidebar,
} from "../../components/Dashboard";

const DashboardLayout = () => {
  const { authObj, dispatch } = useAuth();

  console.log(authObj, "auth object from context.");

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
    const verifyRefreshToken = async () => {
      try {
        await refresh();

        // here impplementing the logic for getting assigned features.
        const response = await getData("/assignFeatures");
        console.log(response, ">>>>>>>>>>>>reposne of assigned features");
        if (response?.status === 200) {
          dispatch({
            type: "FEATURE",
            assignedFeatures: response.data.feature,
          });
        }
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
      <div className={`${style["loader-block"]}`}>
        <div className={`${style["loader-outer"]}`}>
          <div className={`${style["loader-19"]}`}></div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
