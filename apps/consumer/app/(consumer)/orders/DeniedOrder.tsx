"use client";

import { Player } from "@lottiefiles/react-lottie-player";
import Link from "next/link";

import { Button } from "app/components/ui/button";

export default function DeniedOrder() {
	return (
		<div className="text-center max-w-lg m-auto">
			<Player
				src="https://lottie.host/54b375e9-543a-4923-9bf6-54839d220443/XcSU8Cb6pV.json"
				className="h-56"
				autoplay
				loop
			/>
			<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
				Order has been denied.
			</h4>
			<p className="mt-6 text-xl leading-8 text-gray-600">
				No further action is required on your part.
			</p>

			<Link href="/dashboard" replace>
				<Button className="mt-4">Go home</Button>
			</Link>
		</div>
	);
}
