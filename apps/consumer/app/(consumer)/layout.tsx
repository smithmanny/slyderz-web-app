import { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import React, { ReactNode } from "react";

import { getSession } from "app/lib/auth";
import { cn } from "app/lib/utils";

import Appbar from "app/components/AppBar";
import Footer from "app/components/Footer";
import "app/styles/base.css";

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

const Layout = async ({ children }: { children: ReactNode }) => {
	const session = await getSession();
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={cn(roboto.className, "min-h-full")}>
				<Appbar
					user={session?.user}
					className="max-w-screen-xl relative mx-auto"
				/>
				<main>{children}</main>
				<Footer />
			</body>
		</html>
	);
};

export default Layout;
