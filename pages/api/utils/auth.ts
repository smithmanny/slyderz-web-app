import { sign, verify } from "jsonwebtoken";

export function setTokens(user) {
  const accessUser = {
    id: user.id
  };
  const accessToken = sign({ user: accessUser }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
  const refreshUser = {
    id: user.id,
    count: user.tokenCount
  };
  const refreshToken = sign({ user: refreshUser }, process.env.REFRESH_TOKEN_SECRET)

  return { accessToken, refreshToken };
}

export function tokenCookies({ accessToken, refreshToken }) {
  const cookieOptions = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 30
    // secure: true, //for HTTPS only
    // domain: "your-website.com",
    // SameSite: None
  };
  return {
    access: ["access", accessToken, cookieOptions],
    refresh: ["refresh", refreshToken, cookieOptions]
  };
}

export function validateAccessToken(token) {
  try {
    return verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch {
    return null;
  }
}

export function validateRefreshToken(token) {
  try {
    return verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch {
    return null;
  }
}