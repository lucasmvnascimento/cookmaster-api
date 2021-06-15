const jwt = require('jsonwebtoken');

const secret = 'trybe';

const validateJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return next({
    error: 401,
    message: 'missing auth token'
  });
  try {
    const decoded = jwt.verify(token, secret);
    const user = decoded.data;
    req.user = user;
    next();
  } catch (err) {
    return next({
      error: 401,
      message: err.message,
    });
  }
};

module.exports = validateJWT;