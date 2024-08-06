const jwt = require("jsonwebtoken");
const { env } = require("../config");
const createToken = ({ _id }) => jwt.sign({ _id }, env.JWT_SECRET_KEY);
const verifyToken = ({ token }) => jwt.verify(token, env.JWT_SECRET_KEY);

// Generate refresh token by user id
const createRefreshToken = ({ _id }) => {
  return jwt.sign({ _id }, env.JWT_REFRESH_SECRET_KEY);
};

const verifyRefreshToken = (refreshToken) =>
  jwt.verify(refreshToken, env.JWT_REFRESH_SECRET_KEY);

module.exports = {
  createToken,
  verifyToken,
  createRefreshToken,
  verifyRefreshToken,
};
