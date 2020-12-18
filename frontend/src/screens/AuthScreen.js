import React, { useState } from "react";
import "../css/auth.css";

const AuthScreen = () => {
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
          <form action="#">
            <h3>Create Account</h3>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-google mr-3"></i>{" "}
                <span style={{fontSize: "0.9rem"}}>Sign up with google</span>
              </a>
            </div>
            <div className="mt-2"></div>
            <h5>OR</h5>
            <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="mt-4">Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form action="#">
            <h3>Sign in</h3>
            <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-google mr-3"></i>
                <span style={{fontSize: "0.9rem"}}>Sign in with google</span>
              </a>
            </div>
            <div className="mt-2"></div>
            <h5>OR</h5>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#" className="social">
              Forgot your password?
            </a>
            <button>Sign In</button>
          </form>
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
