import React from "react";
import logo from "../../img/argentBankLogo.png";
import "./NavBar.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/reducers/authReducer";
import { getProfile } from "../../redux/actions/authActions";

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
    if (isAuthenticated && !user.firstName) {
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
            <span>{user.firstName}</span>
            <Link className="main-nav-item" to="/logout">
              <button className="fa fa-user-circle" onClick={handleSignOut}>
                Sign out
              </button>
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
