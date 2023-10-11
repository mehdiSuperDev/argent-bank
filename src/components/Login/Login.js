import React, { useState, useEffect } from "react";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../redux/actions/authActions";
import useConditionalRedirect from "../../hooks/useConditionalRedirect";

function Login() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Redirige vers le profil si déjà authentifié
  useConditionalRedirect(isAuthenticated, "/profile");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const authState = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target.username.value;
    const password = e.target.password.value;

    try {
      const actionResult = await dispatch(login({ email, password }));
      if (actionResult.type === login.fulfilled.type) {
        navigate("/profile");
      } else {
        console.error("Invalid credentials");
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  useEffect(() => {
    if (authState.isAuthenticated) {
      localStorage.setItem("jwt", authState.token);
    }
  }, [authState.isAuthenticated, authState.token]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLogin}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button type="submit" className="sign-in-button">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
}

export default Login;
