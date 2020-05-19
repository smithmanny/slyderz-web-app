import { PrismaClient } from '@prisma/client'
import { setTokens, tokenCookies, validateAccessToken, validateRefreshToken } from '../../pages/api/utils/auth'

const prisma = new PrismaClient()

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
    await prisma.connect()
    let user;
    try {
      user = await prisma.user.findOne({ where: { id: decodedRefreshToken.user.id } })
    } catch(e) {
      console.warn(e.message)
    }
    await prisma.disconnect()
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

export default validateTokensMiddleware