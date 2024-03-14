const jwt = require("jsonwebtoken");

const generateToken = (payload) =>
  jwt.sign(
    {
      userId: payload, // data payload
    },
    process.env.JWT_SECRET_KEY, // secret key
    {
      expiresIn: process.env.JWT_EXPIRE_TIME, //expire time
    }
  );

  module.exports = generateToken;
