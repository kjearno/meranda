import React from "react";
import { useMediaQuery } from "react-responsive";

export const DeviceContext = React.createContext(false);

export const DeviceProvider = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <DeviceContext.Provider value={isMobile}>{children}</DeviceContext.Provider>
  );
};
