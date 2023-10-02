const jwt = require('jsonwebtoken');
const config = require('./config');

function generateToken(user){

  return jwt.sign({ id: user._id }, config.jwtSecret
)};


function verifyToken(req, res, next) {

  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, config.jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = { generateToken, verifyToken };