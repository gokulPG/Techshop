import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrderDetails } from "../actions/orderActions";
import { getUserDetails } from "../actions/userAction";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const UserEditScreen = ({ match, history, color }) => {
  const userId = match.params.id;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  console.log(user, "userEdutScreen")
  useEffect(() => {
      if(!user || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
  }, [dispatch, user, userId]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Link
        className="btn btn-light btn-outline-dark btn-sm my-3"
        to="/admin/userList"
      >
        <i style={{ color }} class="fas fa-angle-double-left"></i>
        <span className="ml-2 fa-8">Go Back</span>
      </Link>
      <h2 className="text-center">Edit User</h2>
      {loading && <Loader /> ? (
        error && <Message variant="danger">{error}</Message>
      ) : (
        <form action="#" onSubmit={submitHandler}>
          <div
            className="profile-input d-flex flex-column"
            style={{ margin: "0px 25%" }}
          >
            <input
              name="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="d-flex align-items-end">
              <input
                id="isAdmin"
                name="isAdmin"
                type="checkbox"
                className="mr-2"
                checked={isAdmin}
                value={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              />
              <label for="isAdmin"> Is Admin</label>
            </div>
            <button type="submit" className="mt-3 update-profile-btn">
              Update
            </button>
          </div>
        </form>
      )}
    </>
  );
};


UserEditScreen.defaultProps = {
    color: "#198ada",
  };

export default UserEditScreen;
