const jwt = require('jsonwebtoken')

function getUserId(context) {
  const user = context.request.userId || null
  return user
}

function getUserToken(req) {
  const { _slyderz } = req.cookies
  if (_slyderz) {
    const { userId } = jwt.verify(_slyderz, process.env.APP_SECRET)
    // put the userId onto the req for future requests to access
    req.userId = userId
  }
}

module.exports = {
  getUserId,
  getUserToken
}

