
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;
  let defaultStyle = {
    color: "#8C461F",
  };
  let activeStyle = {
    color: "#FFFFFF",
    background: "#8B5742",
  };

  return (
    <Link
      to={to}
      className={`block`}
      style={isActive ? activeStyle : defaultStyle}
    >
      {children}
    </Link>
  );
}
