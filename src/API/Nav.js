import React from "react";
import { Magic } from "react-bootstrap-icons";

const Nav = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm p-2 mb-4">
      <div className="container-fluid">
        <div className="navbar-brand">
          <img src='logo.png' alt="logo" width={"48px"} className="me-2"/> <span>Voice Guru</span>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
