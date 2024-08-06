const mongoose = require("mongoose");

const env = require("./env");

const connectToMongoDb = async () => {
  try {
    mongoose.set("strictQuery", true);
    if (env.NODE_ENV === "test") {
      await mongoose.connect(env.MONGO_URI_TEST);
    } else {
      await mongoose.connect(env.MONGO_URI);
    }
  } catch (error) {
    console.error("Error in connecting to mongodb Atlas", error);
    throw new Error(error);
  }
};

module.exports = {
  connectToMongoDb,
};
