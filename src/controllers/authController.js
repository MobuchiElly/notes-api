const {
  registerUser,
  loginUser,
  getCurrentUserService,
} = require("../services/authService");

const register = async (req, res, next) => {
  const { username, id, email, token } = await registerUser(req.body);

  res.status(201).json({ success: true, user: {
    username, id, email
  }, token });
};

const login = async (req, res, next) => {
  const { username, id, email, token } = await loginUser(req.body);

  res.status(200).json({
    success: true,
    user: {
      username, id, email,
    },
    token,
  });
};

const getCurrentUser = async (req, res) => {
  const user = await getCurrentUserService(req.user.userId);
  res.status(200).json({ user });
};

module.exports = {
  register,
  login,
  getCurrentUser,
};