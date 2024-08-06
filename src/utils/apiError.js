class AppError extends Error {
  constructor(message, statusCode, name) {
    console.log(name, "error name");
    console.log(message, "error message");
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    this.name = name || this.constructor.name; // Set the name property
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
