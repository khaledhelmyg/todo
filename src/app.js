const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares");
const { userRoutes, todoRoutes, uploadRoutes } = require("./routes");
const { AppError } = require("./utils");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "working fine" });
});

app.use("/auth", userRoutes);
app.use("/todos", todoRoutes);
app.use("/upload", uploadRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Route Not Found`, 404));
});

// Using Error handling middleware
app.use(errorHandler);

module.exports = app;
