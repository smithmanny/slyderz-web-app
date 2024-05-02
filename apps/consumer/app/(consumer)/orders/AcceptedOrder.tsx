"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

import { Button } from "app/components/ui/button";

export default function AcceptedOrder() {
	return (
		<div className="text-center max-w-lg m-auto">
			<Player
				src="https://lottie.host/9a1cc034-8c44-48c1-b95a-16c0ab35e6b3/BDyXMcNqJT.json"
				className="h-56"
				autoplay
				loop
			/>
			<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
				Great news! The order has been accepted.
			</h4>
			<p className="mt-6 text-xl leading-8 text-gray-600">
				Check your dashboard for more information.
			</p>

			<Link href="/dashboard" replace>
				<Button className="mt-4">Go home</Button>
			</Link>
		</div>
	);
}
