const jwt = require('jsonwebtoken');

const encodeToken = (userId) => {
  return jwt.sign({ user_id: userId }, process.env.JWT_SECRET);
};

module.exports = { encodeToken };

