export const setCookies = cookies => {
  Object.entries(cookies).map(([key, value]) => {
    document.cookie = cookie.serialize(key, value, {
      expires: expiresAt,
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })
  })
}

export const removeCookies = cookies => {
  Object.entries(cookies).map(([key, value]) => {
    document.cookie = cookie.serialize(key, value, {
      maxAge: -1 // Expire the cookie immediately
    })
  })
}