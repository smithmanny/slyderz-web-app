"use client";

import { useRudderStackAnalytics } from "app/lib/rudderstack";

export default function Template({ children }: { children: React.ReactNode }) {
	useRudderStackAnalytics();
	return <div>{children}</div>;
}
