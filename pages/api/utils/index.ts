function getUserId(token) {
  const userId = token.userId

  if (!userId) {
    throw new Error('Not Authorized!')
  }

  return userId
}

export { getUserId }


