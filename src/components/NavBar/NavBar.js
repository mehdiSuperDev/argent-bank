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
            <FontAwesomeIcon icon={faUserCircle} className="main-nav-item" />
            <Link to="/profile">
              <span className="main-nav-item">{user?.firstName}</span>
            </Link>
            <span
              role="button"
              className="main-nav-item"
              onClick={handleSignOut}
            >
              Sign out
            </span>
          </>
        ) : (
          <Link to="/login">
            <FontAwesomeIcon icon={faUserCircle} className="main-nav-item" />
            <span role="button" className="main-nav-item">
              Sign In
            </span>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
