"use client";

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
		case "payment_method":
			return url === "/dashboard/payment-method";
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 opacity-75"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<title>Dashboard</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
						/>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
						/>
					</svg>

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 opacity-75"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<title>Menu</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
						/>
					</svg>

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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-5 w-5 opacity-75"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						strokeWidth="2"
					>
						<title>Hours</title>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
						/>
					</svg>

					<span className="text-sm font-medium"> Hours </span>
				</Link>
			</li>

			<li>
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
			</li>
		</ul>
	);
}
