const { BadRequestError } = require("../errors");

const validateLoginInput = ( email, password ) => {
  if (!email || !password) {
    throw new BadRequestError("Email and password are required");
  }

  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    throw new BadRequestError("Please provide a valid email address");
  }

  if (password.length < 6) {
    throw new BadRequestError("Password must be at least 6 characters long");
  }
};

module.exports = { validateLoginInput };