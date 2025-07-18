const User = require("../models/user");
const BadRequestError = require("../errors/custom-errors/bad-request-error");
const {validateLoginInput} = require("../validations/auth-validation");

const registerUser = async ({ username, email, password }) => {
  if (!username || !email || !password) {
    throw new BadRequestError("Username, email, and password are required");
  }
  
  //Database schema handles email validation and averts email duplication
  const user = await User.create({ username, email, password });
  const token = await user.createJWT();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  };
};

const loginUser = async ({ email, password }) => {
  validateLoginInput(email, password);

  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequestError("Email does not exist. Provide the correct credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new BadRequestError("Incorrect password");
  }

  const token = await user.createJWT();

  return {
    id: user._id,
    username: user.username,
    email: user.email,
    token,
  };
};

const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  return user;
};

module.exports = {
  registerUser,
  loginUser,
  getCurrentUserService,
};