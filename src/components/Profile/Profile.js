import React from "react";
import "./Profile.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, updateProfile } from "../../redux/actions/authActions";
import useConditionalRedirect from "../../hooks/useConditionalRedirect";

function Profile() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Redirige vers la connexion si non authentifié
  useConditionalRedirect(!isAuthenticated, "/login");

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (!user) {
      dispatch(getProfile());
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user, dispatch]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    await dispatch(updateProfile({ firstName, lastName }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFirstName(user.firstName);
    setLastName(user.lastName);
  };

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user ? `${user.firstName} ${user.lastName}` : "Loading..."}!
        </h1>
        {!isEditing && (
          <button className="edit-button" onClick={handleEditClick}>
            Edit Name
          </button>
        )}
      </div>
      {isEditing && (
        <div>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      )}
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
