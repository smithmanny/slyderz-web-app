import {
  getCookie as getSlyderzCookie,
  setCookie as setSlyderzCookie,
} from "cookies-next";

type SetCookieOptionType = {
  req: any;
  res: any;
  maxAge?: number;
  secure?: boolean;
  httpOnly?: boolean;
};

type GetCookieOptionType = {
  req: any;
  res: any;
};

export function setCookie(
  key: string,
  value: any,
  { req, res, ...options }: SetCookieOptionType
) {
  setSlyderzCookie(key, value, {
    req,
    res,
    maxAge: 60 * 6 * 24, // 1 day
    secure: process.env.NODE_ENV !== "development",
    httpOnly: true,
    ...options,
  });
}

export function getCookie(key: string, { req, res }: GetCookieOptionType) {
  const cookie = getSlyderzCookie(key, { req, res });
  const parsedCookie = JSON.parse(String(cookie));

  return parsedCookie;
}
