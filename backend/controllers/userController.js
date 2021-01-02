import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import { OAuth2Client } from "google-auth-library";
import generateToken from "../utils/generateToken.js";

const client = new OAuth2Client(
  "288205820747-891bbf3o9cvks71hr0en4pv3khnm3g7s.apps.googleusercontent.com"
);

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    user.status(400);
    throw new Error("User already exists");
  }

  let user;

  try {
    user = await User.create({
      name,
      email,
      password,
    });
  } catch (error) {
    res.status(401);
    throw new Error("Invalid name, email or password");
  }

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid name, email or password");
  }
});

// @desc get user profile
// @route GET /api/users/profile
// @access PRIVATE

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc update user profile
// @route PUT /api/users/profile
// @access PRIVATE

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//Private route -Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

//Private route -Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//private route- admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//private route- admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    (user.name = req.body.name || user.name),
      (user.email = req.body.email || user.email);
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Google Authentication

const googleLogin = asyncHandler(async (req, res) => {
  const { tokenId } = req.body;

  await client
    .verifyIdToken({
      idToken: tokenId,
      audience:
        "288205820747-891bbf3o9cvks71hr0en4pv3khnm3g7s.apps.googleusercontent.com",
    })
    .then(async (response) => {
      const { email_verified, name, email } = response.payload;

      if (email_verified) {
        //authenticate a user
        let user
        try {
          user = await User.findOne({ email });
        } catch (error) {
          res.status(401);
          throw new Error("Invalid name, email or password");
        }

        if (user) {
          res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
          });
        } else {
          //create a User
          let password = `#${name}888`

          try {
            user = await User.create({
              name,
              email,
              password,
            });
          } catch (error) {
            res.status(401);
            throw new Error("Invalid name, email or password");
          }

          if (user) {
            res.status(201).json({
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
              token: generateToken(user._id),
            });
          } else {
            res.status(401);
            throw new Error("Invalid name, email or password");
          }

        }
      }


    });
 
  });

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
  googleLogin,
};
