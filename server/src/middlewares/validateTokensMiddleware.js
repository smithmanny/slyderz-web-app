const { Photon } = require('@prisma/photon')
const { setTokens, tokenCookies, validateAccessToken, validateRefreshToken } = require('../utils/auth')

const photon = new Photon()

async function validateTokensMiddleware(req, res, next) {
  const refreshToken = req.cookies["refresh"];
  const accessToken = req.cookies["access"];
  // Skip if no access or refresh token
  if (!accessToken && !refreshToken) return next();

  const decodedAccessToken = validateAccessToken(accessToken);
  if (decodedAccessToken && decodedAccessToken.user) {
    req.user = decodedAccessToken.user;
    return next();
  }

  const decodedRefreshToken = validateRefreshToken(refreshToken);
  if (decodedRefreshToken && decodedRefreshToken.user) {
    const user = await photon.users.findOne({ where: { id: decodedRefreshToken.user.id } })
    if (!user || user.tokenCount !== decodedRefreshToken.user.count) {
      // remove cookies if token not valid
      res.clearCookie("access");
      res.clearCookie("refresh");
      return next();
    }

    const userTokens = setTokens(user);
    req.user = decodedRefreshToken.user;
    // update the cookies with new tokens
    const cookies = tokenCookies(userTokens);
    res.cookie(...cookies.access);
    res.cookie(...cookies.refresh);
    return next();
  }
  next();
}

module.exports = validateTokensMiddleware