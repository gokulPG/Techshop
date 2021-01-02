import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GoogleLogin from "react-google-login";
import { login, googleLogin } from "../actions/userAction";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";
import { Redirect } from "react-router";

const Login = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const userRedirect = useSelector((state) => state.utilReducer);
  const { redirectTo } = userRedirect;
  const { loading, error, userInfo } = userLogin;
  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));

    if (redirectTo) {
      <Redirect to={redirectTo} />;
    }
  };

  const responseGoogle = (response) => {
    dispatch(googleLogin(response))
  };

  return (
    <form action="#" onSubmit={submitHandler}>
      <h3>Sign in</h3>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <GoogleLogin
        clientId="288205820747-891bbf3o9cvks71hr0en4pv3khnm3g7s.apps.googleusercontent.com"
        render={(renderProps) => (
          <div className="social-container" onClick={renderProps.onClick}>
            <a href="#" className="social">
              <i className="fab fa-google mr-3"></i>
              <span style={{ fontSize: "0.9rem" }}>Sign in with google</span>
            </a>
          </div>
        )}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <div className="mt-2"></div>
      <h5>OR</h5>
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
      <button type="submit" className="mt-3">
        Sign In
      </button>
    </form>
  );
};

export default Login;


 // axios({
    //   method: "POST",
    //   url: "/api/auth/googlelogin",
    //   data: { tokenId: response.tokenId },
    // })
    //   .then((response) => {
    //     const { data } = response;

    //     localStorage.setItem("userInfo", JSON.stringify(data));

    //     history.push(redirect);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });