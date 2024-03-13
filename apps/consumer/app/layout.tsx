import { Metadata } from "next";
import { Noto_Sans } from "next/font/google";

import "app/base.css";
import { Toaster } from "app/components/ui/sonner";
import { cn } from "app/lib/utils";

const roboto = Noto_Sans({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Slyderz",
	description:
		"Enjoy the convenience of restaurant-quality meals cooked in your home.",
	openGraph: {
		title: "Slyderz",
		description:
			"Enjoy the convenience of restaurant-quality meals cooked in your home.",
		url: "https://slyderz.co",
		siteName: "Slyderz",
		images: [
			{
				url: "https://nextjs.org/og.png", // Must be an absolute URL
				width: 800,
				height: 600,
			},
			{
				url: "https://nextjs.org/og-alt.png", // Must be an absolute URL
				width: 1800,
				height: 1600,
				alt: "My custom alt",
			},
		],
		locale: "en_US",
		type: "website",
	},
	robots: {
		index: false,
		follow: true,
		nocache: true,
		googleBot: {
			index: true,
			follow: false,
			noimageindex: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	twitter: {
		card: "summary_large_image",
		title: "Slyderz",
		description:
			"Enjoy the convenience of restaurant-quality meals cooked in your home.",
		creator: "@slyderzapp",
		images: ["https://slyderz.co/api/og"], // Must be an absolute URL
	},
};

export default function RootLayout({
	children,
}: { children: React.ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn(roboto.className, "min-h-full")}>
				<main>{children}</main>
				<Toaster />
			</body>
		</html>
	);
}
