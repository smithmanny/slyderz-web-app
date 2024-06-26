import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { Cart } from "types";

export function middleware(request: NextRequest) {
	const cartCookie = request.cookies.get("cart")?.value;
	const nextResponse = NextResponse.next();
	const initialUserCart: Cart = {
		id: "",
		serviceFee: 0,
		subtotal: 0,
		total: 0,
		items: [],
	};

	if (!cartCookie) {
		nextResponse.cookies.set({
			name: "cart",
			value: JSON.stringify(initialUserCart),
			maxAge: 60 * 6 * 24,
			secure: process.env.NODE_ENV !== "development",
			httpOnly: true,
		});
	}
	return nextResponse;
}

export const config = {
  matcher: ['/chefs/:path*'],
}
