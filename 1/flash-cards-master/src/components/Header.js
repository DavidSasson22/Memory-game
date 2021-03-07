import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div id="header">
      <NavLink className="nav-link" exact to="/">
        Homepage
      </NavLink>
      <NavLink className="nav-link" to="/flash-cards">
        Flash Cards
      </NavLink>
      <NavLink className="nav-link" to="/manage-cards">
        Manage Cards
      </NavLink>
    </div>
  );
};

export default Header;
