"use client";

import Link from "next/link";

import Container from "app/components/Container";
import { Button } from "app/components/ui/button";

export default function ErrorPage({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	return (
		<Container className="max-w-lg">
			<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
				Sorry. We couldn&apos;t verify that email
			</h4>

			<Link href="/" replace>
				<Button className="mt-4">Go home</Button>
			</Link>
		</Container>
	);
}
