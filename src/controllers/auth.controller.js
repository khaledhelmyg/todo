const { User } = require("../models");
const { jwtToken, AppError } = require("../utils");

// User registeration controller
const register = async (req, res, next) => {
  try {
    const { displayName, phone, password, address, experienceYears, level } =
      req.body;

    // Create a new user
    const user = new User({
      displayName,
      username: phone,
      password,
      address,
      experienceYears,
      level,
    });
    // Generate tokens
    const { _id } = user;
    const access_token = jwtToken.createToken({ _id });
    const refresh_token = jwtToken.createRefreshToken({ _id });

    let refresh_tokens = [];
    refresh_tokens.push(refresh_token);
    user.refreshTokens = refresh_tokens;
    // Hash the password done in user model
    await user.save();

    res.json({ _id, displayName, access_token, refresh_token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { phone, password } = req.body;
  const user = await User.findOne({ username: phone });
  if (!user) {
    return next(new AppError("Unauthorized", 403, "UnauthorizedError"));
  }

  const validPassword = await user.comparePassword(password);
  if (!validPassword) {
    return next(new AppError("Unauthorized", 403, "UnauthorizedError"));
  }
  // Generate tokens
  const { _id } = user;
  const access_token = jwtToken.createToken({ _id });
  const refresh_token = jwtToken.createRefreshToken({ _id });
  console.log("now");
  // Store refresh token in the user model
  // Directly update the refreshTokens array without triggering validation
  user.refreshTokens.push(refresh_token);
  await User.updateOne({ _id }, { refreshTokens: user.refreshTokens });

  res.json({ _id, access_token, refresh_token });
};

const refreshToken = async (req, res) => {
  const accessToken = jwtToken.createToken(req.user._id);
  res.json({ accessToken });
};

const userProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "-refreshTokens -password"
    );
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const logout = async (req, res, next) => {
  try {
    const { token: refreshToken } = req.body;

    // Find the user and remove the refresh token in one operation
    const user = await User.findOneAndUpdate(
      { refreshTokens: { $in: [refreshToken] } },
      { $pull: { refreshTokens: refreshToken } },
      { new: true } // Return the updated document
    );

    if (!user) {
      return res.status(404).json({ success: false });
    }

    res.json({ success: true });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, refreshToken, userProfile, logout };
