import type { Metadata } from "next";
import React, { type ReactNode } from "react";

import Appbar from "app/components/AppBar";
import Footer from "app/components/Footer";

import { getSession } from "app/lib/auth";

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
	const { user } = await getSession();
	return (
		<>
			<Appbar className="sticky top-0" user={user} />
			{children}
			<Footer />
		</>
	);
};

export default Layout;
