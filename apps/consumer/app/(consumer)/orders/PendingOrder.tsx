"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

import { Button } from "app/components/ui/button";

export default function PendingOrder() {
	return (
		<div className="text-center max-w-lg m-auto">
			<Player
				src="https://lottie.host/934f9cfe-40f9-4a67-b0b6-d7004a07cc16/WPwRcfqx7t.json"
				className="h-56"
				autoplay
				loop
			/>
			<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
				Awaiting chefs response
			</h4>
			<p className="mt-6 text-xl leading-8 text-gray-600">
				Your order has been submitted and is waiting for the chef response. You
				will not be charged until your order has been accepted.
			</p>

			<Link href="/" replace>
				<Button className="mt-4">Go home</Button>
			</Link>
		</div>
	);
}
