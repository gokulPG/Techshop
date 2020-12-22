import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { getUserDetails, updateUserProfile } from "../actions/userAction";
import Loader from "../components/Loader.js";
import Message from "../components/Message.js";

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserDetails("profile"));
    }
  }, [history, userInfo]);

  useEffect(() => {
    if (user !== undefined) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      //DISPATCH UPDATE PROFILE
      dispatch(updateUserProfile({id: user._id, name, email, password}))
    }
  };

  return (
    <Row>
      <Col md={4}>
        <form action="#" onSubmit={submitHandler} style={{ textAlign: "center"}}>
          <h3>Update Profile</h3>
          {message && <Message variant="danger">{message}</Message>}
          {error && <Message variant="danger">{error}</Message>}
          {success && <Message variant="success">Profile Updated!!</Message>}
          {loading && <Loader />}
          <div className="profile-input d-flex flex-column">
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
            <input
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="mt-3 update-profile-btn">
            Update Profile
          </button>
        </form>
      </Col>
      <Col md={8}></Col>
    </Row>
  );
};

export default ProfileScreen;
