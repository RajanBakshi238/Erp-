import React from "react";

import AuthProvider from "./AuthContext/context";
import NavbarProvider from "./NavbarContext/context";
import LoaderProvider from "./LoaderContext/context";

const GlobalState = ({ children }) => {
  return (
    <>
      <LoaderProvider>
        <NavbarProvider>
          <AuthProvider>{children}</AuthProvider>
        </NavbarProvider>
      </LoaderProvider>
    </>
  );
};

export default GlobalState;
