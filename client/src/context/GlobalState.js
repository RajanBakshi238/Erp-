import React from "react";
import AuthProvider from "./AuthContext/context";
import NavbarProvider from "./NavbarContext/context";

const GlobalState = ({ children }) => {
  return (
    <>
      <NavbarProvider>
        <AuthProvider>{children}</AuthProvider>
      </NavbarProvider>
    </>
  );
};

export default GlobalState;
