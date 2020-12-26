import React from "react";
import Search from "../../src/common/Search";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction.js";
import { Redirect } from "react-router";
import "../css/header.css";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const userRedirect = useSelector((state) => state.utilReducer);

  const { redirectTo } = userRedirect;
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    if (redirectTo) {
      <Redirect to={redirectTo} />;
    }
  };
  return (
    <>
      <nav className="custom-topbar">
        <h3>
          TECH<i class="fab fa-artstation"></i>SHOP
        </h3>
        <div className="search-check">
          <Search />
        </div>
      </nav>
      <nav className="custom-navbar">
        <ul className="custom-navbar-nav">
          <li className="logo">
            <Link to="/" className="custom-nav-link">
              <span className="link-text-logo logo-text">TECHSHOP</span>
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fad"
                data-icon="angle-double-right"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
                className="svg-inline--fa fa-angle-double-right"
                width="35px"
                height="35px"
              >
                <g className="fa-group">
                  <path
                    fill="currentColor"
                    d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                    className="fa-secondary"
                  ></path>
                  <path
                    fill="currentColor"
                    d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                    className="fa-primary"
                  ></path>
                </g>
              </svg>
            </Link>
          </li>

          <li className="custom-nav-item">
            <NavLink
              to="/cart"
              className="custom-nav-link"
              activeClassName="custom-nav-link-active"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="shopping-cart"
                className="svg-inline--fa fa-shopping-cart"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                width="20px"
                height="20px"
              >
                <path
                  fill="currentColor"
                  d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"
                  className="fa-primary"
                ></path>
              </svg>
              <span className="link-text">CART</span>
            </NavLink>
          </li>

          <li className="custom-nav-item">
            {userInfo ? (
              <>
                <NavLink
                  to="/profile"
                  className="custom-nav-link"
                  activeClassName="custom-nav-link-active"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="user"
                    class="svg-inline--fa fa-user fa-w-14"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="22px"
                    height="22px"
                  >
                    <path
                      fill="currentColor"
                      d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                      className="fa-primary"
                    ></path>
                  </svg>
                  <span className="link-text">PROFILE</span>
                </NavLink>
                <NavLink
                  to="/auth"
                  className="custom-nav-link"
                  activeClassName="custom-nav-link-active"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="sign-out-alt"
                    class="svg-inline--fa fa-sign-out-alt fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="22px"
                    height="22px"
                  >
                    <path
                      fill="currentColor"
                      d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"
                      className="fa-primary"
                    ></path>
                  </svg>
                  <span className="link-text" onClick={logoutHandler}>
                    LOG OUT
                  </span>
                </NavLink>
              </>
            ) : (
              <NavLink
                to="/auth"
                className="custom-nav-link"
                activeClassName="custom-nav-link-active"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="sign-in-alt"
                  className="svg-inline--fa fa-sign-in-alt"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  width="22px"
                  height="22px"
                >
                  <path
                    fill="currentColor"
                    d="M416 448h-84c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h84c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32h-84c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h84c53 0 96 43 96 96v192c0 53-43 96-96 96zm-47-201L201 79c-15-15-41-4.5-41 17v96H24c-13.3 0-24 10.7-24 24v96c0 13.3 10.7 24 24 24h136v96c0 21.5 26 32 41 17l168-168c9.3-9.4 9.3-24.6 0-34z"
                    className="fa-primary"
                  ></path>
                </svg>
                <span className="link-text">SIGN IN</span>
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
