const env = require("./env");
const { connectToMongoDb } = require("./mongo.config");
const uploadMiddleware = require("./multer.config");
module.exports = { env, connectToMongoDb, uploadMiddleware };
