const ApiError = require("../utils/apiError");

const sendForDevMode = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack, // l emplacement de l erreur
  });

const sendForProductionMode = (err, res) =>
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });

const handleJwtInvalidSignature = () =>new ApiError("Invalid token, please login again ..", 401);
const handleJwtExpired = () =>new ApiError('Expired token, please login again ..', 401)

const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendForDevMode(err, res);
  } else {
    if (err.name === "JsonWebTokenError") {
      err = handleJwtInvalidSignature();
    }
    if (err.name === "TokenExpiredError") {
      err = handleJwtExpired();
    }
    console.log(err.name)
    sendForProductionMode(err, res);
  }
};

module.exports = globalError;
