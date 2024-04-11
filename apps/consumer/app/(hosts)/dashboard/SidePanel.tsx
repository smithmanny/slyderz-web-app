"use client";

import { ClockIcon, CookieIcon, DashboardIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { cn } from "app/lib/utils";

function getLinkState(url: string, state: string) {
	switch (state) {
		case "dashboard":
			return url === "/dashboard";
		case "menu":
			return url === "/dashboard/menu";
		case "hours":
			return url === "/dashboard/hours";
		// case "payment_method":
		// 	return url === "/dashboard/payment-method";
		default:
			return false;
	}
}

export default function SidePanel() {
	const url = usePathname();
	const isDashboardActive = getLinkState(url, "dashboard");
	const isMenuActive = getLinkState(url, "menu");
	const isHoursActive = getLinkState(url, "hours");
	const isPaymentMethodActive = getLinkState(url, "payment_method");
	return (
		<ul className="space-y-1 bg-green-50 h-svh">
			<li>
				<Link
					href="/dashboard"
					className={cn(
						"flex items-center gap-2 rounded-lg pl-4 py-2 text-gray-700",
						isDashboardActive ? "bg-gray-100" : null,
					)}
				>
					<DashboardIcon className="h-5 w-5 opacity-75" />
					<span className="text-sm font-medium"> Dashboard </span>
				</Link>
			</li>

			<li>
				<Link
					href="/dashboard/menu"
					className={cn(
						"flex items-center gap-2 rounded-lg pl-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-700",
						isMenuActive ? "bg-gray-100" : null,
					)}
				>
					<CookieIcon className="h-5 w-5 opacity-75" />
					<span className="text-sm font-medium"> Menu </span>
				</Link>
			</li>

			<li>
				<Link
					href="/dashboard/hours"
					className={cn(
						"flex items-center gap-2 rounded-lg pl-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-700",
						isHoursActive ? "bg-gray-100" : null,
					)}
				>
					<ClockIcon className="h-5 w-5 opacity-75" />
					<span className="text-sm font-medium"> Hours </span>
				</Link>
			</li>

			{/* TODO */}
			{/* <li>
				<Link
					href="/dashboard/payment-method"
					className={cn(
						"flex items-center gap-2 rounded-lg pl-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-700",
						isPaymentMethodActive ? "bg-gray-100" : null,
					)}
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 opacity-75"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<title>Payment Methods</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
						/>
					</svg>

					<span className="text-sm font-medium">Payment Methods</span>
				</Link>
			</li> */}
		</ul>
	);
}
