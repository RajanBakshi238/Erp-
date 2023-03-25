import { createContext, useContext, useState, useReducer } from "react";
import { authReducer } from "./reducer";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // const [auth] = useState({});

  const [authObj, dispatch] = useReducer(authReducer, {
    auth: {},
    assignedFeatures: {},
  });

  return (
    <AuthContext.Provider value={{ authObj, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
