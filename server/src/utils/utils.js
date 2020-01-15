function getUserId(context) {
  const user = context.request.user.id || null
  return user
}

module.exports = {
  getUserId,
}

