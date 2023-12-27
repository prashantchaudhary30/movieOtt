const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token is missing' })
  }
  console.log('token', token.replace('Bearer ', ''))
  jwt.verify(
    token.replace('Bearer ', ''),
    process.env.SecretKey || '2O2OAppBackendDevelopment',
    (err, decoded) => {
      if (err) {
        console.log('error in ', err)
        return res.status(401).json({ message: 'Unauthorized: Invalid token' })
      }
      req.user = decoded.user
      console.log(decoded)
      next()
    }
  )
}

const checkAdminRole = (req, res, next) => {
  if (req.user.userRole !== 'admin') {
    return res
      .status(403)
      .json({ message: 'Forbidden: User does not have admin role' })
  }
  next()
}

module.exports = {
  verifyToken,
  checkAdminRole
}
