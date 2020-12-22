import React, { useState } from "react";
import Login from "../components/Login.js";
import Register from '../components/Register.js';
import "../css/auth.css";

const AuthScreen = ({location, history}) => {
  const [isClicked, setClicked] = useState(false);
  return (
    <div className="auth-wrapper">
      <div
        className={
          isClicked ? "auth-container right-panel-active" : "auth-container"
        }
        id="auth-container"
      >
        <div className="form-container sign-up-container">
           <Register location={location} history={history} />
        </div>
        <div className="form-container sign-in-container">
          <Login location={location} history={history} />
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h2>Welcome Back!</h2>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setClicked(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h2>Hello, Friend!</h2>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setClicked(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
