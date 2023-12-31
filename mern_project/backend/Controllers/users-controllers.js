const Http_Error = require("../Models/http-error");
const { validationResult } = require("express-validator");
const User = require("../Models/user");

const getAllUsers = async (req, res, next) => {
  let allUsers;
  try {
    allUsers = await User.find({}, "email username places image");
  } catch (error) {
    return next(new Http_Error("Could not get all users!", 500));
  }
  res.json({ allUsers });
};

const signup = async (req, res, next) => {
  console.log('pre');
  const validatipnErrors = validationResult(req);
  console.log('after');
  console.log(validatipnErrors);

  if (!validatipnErrors.isEmpty()) {
    console.log('inputs!!!!');
    return next(new Http_Error("Inputs not valid!", 422));
  }

  const { username, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (error) {
    console.log('server!!!!');
    const err = new Http_Error("Signup failed, try again!", 500);
    return next(err);
  }

  if (existingUser) {
    console.log('existing!!!!');
    const err = new Http_Error("User with this email exists already.", 422);
    return next(err);
  }

  // DUMMY_USERS.push(newUser);
  const newUser = new User({
    username,
    email,
    image:
      "data:image/jpeg;base64,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",
    password,
    places: [],
  });

  try {
    console.log('saving1!!!!');
    await newUser.save();
  } catch (error) {
    console.log('saving2!!!!');
    const err = new Http_Error("Signing up failed!", 500);
    return next(err);
  }

  // res.status(201).json({ user: newUser.toObject({ getters: true }) });
  res.status(201).json({ newUser });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let loggedinUser;
  try {
    loggedinUser = await User.findOne({ email: email });
  } catch (error) {
    return next(error);
  }

  if (!loggedinUser) {
    return next(new Http_Error("Email does not exist in the database!", 401));
  }
  if (loggedinUser.password === password) {
    return res.json({ message: "Logged in!", loggedinUser });
  }
  return next(new Http_Error("Invalid password!", 401));
};

exports.getAllUsers = getAllUsers;
exports.signup = signup;
exports.login = login;
