require("dotenv").config();

module.exports = {
  ENVIRONMENT: process.env.ENVIRONMENT || "development",
  PORT: process.env.PORT || "8080",
  APP_HOST: process.env.APP_HOST,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_URI_TEST: process.env.MONGO_URI_TEST,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  JWT_REFRESH_SECRET_KEY: process.env.JWT_REFRESH_SECRET_KEY,
};
