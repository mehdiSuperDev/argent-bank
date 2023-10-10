import React from "react";
import logo from "../../img/argentBankLogo.png";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function NavBar() {
  const user = useSelector((state) => state.user);

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={logo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {user && user.firstName ? (
          <>
            <span>{user.firstName}</span>
            <Link className="main-nav-item" to="/logout">
              <i className="fa fa-user-circle"></i>
              Sign Out
            </Link>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
