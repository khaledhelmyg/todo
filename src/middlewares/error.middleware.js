// errorHandler.js
const errorHandler = (err, req, res, next) => {
  console.log(err, "eror");
  let statusCode = err.statusCode || 500; // Default to 500 if not set
  let status = err.status || statusCode; // Use status from error or fallback to statusCode
  let message = err.message || "Internal Server Error";
  // Customize message for specific errors
  if (err.name === "ValidationError") {
    status = 500; // Maintain status as 500 for validation errors
    message = `Todo validation failed: ${Object.values(err.errors)
      .map((e) => e.message)
      .join(", ")}`;
    return res.status(status).json({ status, message });
  } else if (err.name === "UnauthorizedError") {
    let errorData = {};
    if (statusCode === 401) {
      errorData.message = "Unauthorized";
      errorData.statusCode = 401;
    } else {
      errorData.message = "يوجد خطأ في رقم الهاتف أو كلمة المرور";
      errorData.error = "Unauthorized";
      errorData.statusCode = 403;
    }

    return res.status(statusCode).json(errorData);
  } else if (err.name === "ForbiddenError") {
    statusCode = 403; // Forbidden
    message = "Forbidden";
    return res.status(statusCode).json({
      message,
      statusCode,
    });
  } else if (err.code === 11000) {
    statusCode = 422; // Unprocessable Entity
    message = "رقم الهاتف مستخدم بالفعل";

    return res.status(statusCode).json({
      message,
      error: "Unprocessable Entity",
      statusCode,
    });
  }

  // Fallback for other errors
  res.status(status).json({
    status,
    message,
  });
};

module.exports = errorHandler;
