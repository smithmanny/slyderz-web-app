import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { Cart } from "types";

export function middleware(request: NextRequest) {
    const cartCookie = request.cookies.get("cart")?.value
    const nextResponse = NextResponse.next()
    const initialUserCart: Cart = {
      items: [],
      total: 0,
    };

  if (!cartCookie) {
      nextResponse.cookies.set({
        name: "cart",
        value: JSON.stringify(initialUserCart),
        maxAge: 60 * 6 * 24,
        secure: process.env.NODE_ENV !== "development",
        httpOnly: true,
      })
  }
  return nextResponse
}