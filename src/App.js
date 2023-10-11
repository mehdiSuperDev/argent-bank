import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import React from "react";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import Footer from "./components/Footer/Footer";
import { setUserToken, getProfile } from "./redux/actions/authActions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function InitializeApp() {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      dispatch(setUserToken(token));
      dispatch(getProfile());
    }
  }, [dispatch]);

  return (
    <Router>
      <div className="container">
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <InitializeApp />
    </Provider>
  );
}

export default App;
