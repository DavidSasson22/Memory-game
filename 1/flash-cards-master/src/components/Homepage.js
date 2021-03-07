import React from "react";
import { NavLink } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="inner-page">
      <div className="dark-bg homepage">
        <NavLink className="nav-link" to="/flash-cards">
          Flash Cards
        </NavLink>
        <NavLink className="nav-link" to="/manage-cards">
          Manage Cards
        </NavLink>
      </div>
    </div>
  );
};

export default Homepage;
