"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

interface TanstackWrapperProps extends PropsWithChildren {}
export function TanstackWrapper({ children }: TanstackWrapperProps) {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						// With SSR, we usually want to set some default staleTime
						// above 0 to avoid refetching immediately on the client
						staleTime: 60 * 1000,
					},
				},
			}),
	);
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}
