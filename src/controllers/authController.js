const User = require("../models/user");
// const { StatusCodes } = require('http-status-codes');
const BadRequestError = require("../errors/custom-errors/bad-request-error");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  //Email validation and trimming is done in the mongoose schema and handled graciously by error handler middleware
  if (!username || !email || !password) {
    throw new BadRequestError("Username, email, and password are required");
  }
  
  //User model handles the event of Email alreafy in database
  const user = await User.create({ username, email, password });
  const token = await user.createJWT();

  res.status(201).json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Email does not exist. Provide the correct credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Wrong password");
  }

  const token = await user.createJWT();

  res.status(200).json({
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
    token
  });
};

const getCurrentUser = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId).select("-password");
  res.status(200).json({ user });
};

module.exports = {
  register,
  login,
  getCurrentUser,
};