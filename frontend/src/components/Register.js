import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { Redirect } from "react-router";

const Register = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const userRedirect = useSelector((state) => state.utilReducer);
  const { redirectTo } = userRedirect;
  const { loading, error, userInfo } = userRegister;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));

    if (redirectTo) {
      <Redirect to={redirectTo} />;
    }
  };

  return (
    <form action="#" onSubmit={submitHandler} style={{overflowY: "auto"}}>
      <h3>Create Account</h3>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      {/* <div className="social-container">
        <a href="#" className="social">
          <i className="fab fa-google mr-3"></i>
          <span style={{ fontSize: "0.9rem" }}>Sign in with google</span>
        </a>
      </div> */}
      <div className="mt-2"></div>
      {/* <h5>OR</h5> */}
      <input
        type="text"
        placeholder="Enter name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="mt-3">Sign Up</button>
    </form>
  );
};

export default Register;
