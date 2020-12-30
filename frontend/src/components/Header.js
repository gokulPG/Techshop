import React from "react";
import { Route } from "react-router-dom";
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
          <Route render={({ history }) => <Search history={history} />} />
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
            {userInfo && !userInfo.isAdmin && (
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
            )}
            {userInfo && userInfo.isAdmin && (
              <>
                <NavLink
                  to="/admin/userlist"
                  className="custom-nav-link"
                  activeClassName="custom-nav-link-active"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="users"
                    class="svg-inline--fa fa-users fa-w-20"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    width="22px"
                    height="22px"
                  >
                    <path
                      fill="currentColor"
                      d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                      className="fa-primary"
                    ></path>
                  </svg>
                  <span className="link-text">USERS</span>
                </NavLink>
                <NavLink
                  to="/admin/productlist"
                  className="custom-nav-link"
                  activeClassName="custom-nav-link-active"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fab"
                    data-icon="product-hunt"
                    class="svg-inline--fa fa-product-hunt fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="22px"
                    height="22px"
                  >
                    <path
                      fill="currentColor"
                      d="M326.3 218.8c0 20.5-16.7 37.2-37.2 37.2h-70.3v-74.4h70.3c20.5 0 37.2 16.7 37.2 37.2zM504 256c0 137-111 248-248 248S8 393 8 256 119 8 256 8s248 111 248 248zm-128.1-37.2c0-47.9-38.9-86.8-86.8-86.8H169.2v248h49.6v-74.4h70.3c47.9 0 86.8-38.9 86.8-86.8z"
                      className="fa-primary"
                    ></path>
                  </svg>
                  <span className="link-text">PRODUCTS</span>
                </NavLink>
                <NavLink
                  to="/admin/orderlist"
                  className="custom-nav-link"
                  activeClassName="custom-nav-link-active"
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="th-list"
                    class="svg-inline--fa fa-th-list fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    width="22px"
                    height="22px"
                  >
                    <path
                      fill="currentColor"
                      d="M149.333 216v80c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-80c0-13.255 10.745-24 24-24h101.333c13.255 0 24 10.745 24 24zM0 376v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H24c-13.255 0-24 10.745-24 24zM125.333 32H24C10.745 32 0 42.745 0 56v80c0 13.255 10.745 24 24 24h101.333c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24zm80 448H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24zm-24-424v80c0 13.255 10.745 24 24 24H488c13.255 0 24-10.745 24-24V56c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24zm24 264H488c13.255 0 24-10.745 24-24v-80c0-13.255-10.745-24-24-24H205.333c-13.255 0-24 10.745-24 24v80c0 13.255 10.745 24 24 24z"
                      className="fa-primary"
                    ></path>
                  </svg>
                  <span className="link-text">ORDERS</span>
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
            )}
            {!userInfo && (
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
