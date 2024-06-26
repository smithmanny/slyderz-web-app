import Link from "next/link";
import React, { type ReactNode } from "react";

import Container from "app/components/Container";
import UserPopover from "app/components/UserPopover";
import TanstackProvider from "app/lib/tanstack";
import SidePanel from "./SidePanel";

import { getChefSession } from "app/lib/auth";

interface LayoutProps {
	children: ReactNode;
	dashboard: ReactNode;
}
const Layout = async ({ children, dashboard }: LayoutProps) => {
	const { user } = await getChefSession();
	return (
		<Container className="px-0 sm:px-0 lg:px-0 max-w-screen-3xl">
			<div className="grid grid-cols-1 md:grid-cols-6">
				<section className="hidden md:block md:col-span-1 py-3 bg-green-50">
					<Link href="/dashboard">
						<p className="text-xl leading-8 font-bold pl-4">Slyderz</p>
					</Link>

					<div className="pt-12 pb-8">
						<SidePanel />
					</div>
				</section>

				<section className="col-span-1 md:col-span-5 py-3">
					<div className="md:pr-4">
						<div className="flex justify-end mb-4">
							<UserPopover user={user} />
						</div>
						<div className="py-8 px-4 md:px-8">
							<TanstackProvider>{dashboard}</TanstackProvider>
						</div>
					</div>
				</section>
			</div>
		</Container>
	);
};

export default Layout;
