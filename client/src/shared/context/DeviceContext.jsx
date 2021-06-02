import React from "react";
import PropTypes from "prop-types";
import { useMediaQuery } from "react-responsive";

export const DeviceContext = React.createContext(false);

export const DeviceProvider = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <DeviceContext.Provider value={isMobile}>{children}</DeviceContext.Provider>
  );
};

DeviceProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
};
