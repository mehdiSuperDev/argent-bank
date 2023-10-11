import React from "react";
import logo from "../../img/argentBankLogo.png";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/authReducer";
import { getProfile } from "../../redux/actions/authActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(logout());
    localStorage.removeItem("jwt");
    navigate("/");
  };

  React.useEffect(() => {
    if (isAuthenticated && user && !user.firstName) {
      dispatch(getProfile());
    }
  }, [isAuthenticated, user, dispatch]);

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
        {isAuthenticated ? (
          <>
            <FontAwesomeIcon icon={faUserCircle} />
            <span className="main-nav-item">{user?.firstName}</span>
            <span
              role="button"
              className="main-nav-item"
              onClick={handleSignOut}
              style={{ cursor: "pointer" }}
            >
              Sign out
            </span>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
