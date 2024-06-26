import { cn } from "app/lib/utils";
import type { ReactNode } from "react";

export default function Container({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"relative max-w-screen-xl mx-auto px-2 sm:px-6 lg:px-8",
				className,
			)}
		>
			{children}
		</div>
	);
}
