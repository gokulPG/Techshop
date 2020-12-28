import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getUserDetails, updateUser } from "../actions/userAction";
import { USER_UPDATE_RESET } from "../constants/userConstants";
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

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  console.log(user, "userEdutScreen");
  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push("/admin/userlist");
    } else {
      if (!user || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [dispatch, user, userId, history, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id: userId, name, email, isAdmin}))
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
      {loadingUpdate && <Loader />}
      {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
