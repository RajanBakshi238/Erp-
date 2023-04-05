import { createContext, useContext, useState } from "react";

export const LoaderContext = createContext();

const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
    return useContext(LoaderContext)
}

export default LoaderProvider;
