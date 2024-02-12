import Link from "next/link";

import Announcement from "app/components/Announcement";
import UserPopover from "app/components/UserPopover";
import { cn } from "app/lib/utils";
import type { User } from "lucia";

interface AppBarTypes {
	className?: string;
	user: User | undefined;
}
export default function AppBar(props: AppBarTypes) {
	return (
		<nav className={cn("fixed w-full bg-transparent z-50", props.className)}>
			<div
				className={cn(
					"max-w-screen-2xl mx-auto px-2 sm:px-6 lg:px-8 z-50",
					props.className,
				)}
			>
				<div className="relative flex h-16 items-center justify-between">
					<div className="flex flex-1 items-center justify-center">
						<div className="flex flex-1 items-center">
							<Link href="/">
								<img
									className="h-8 w-auto"
									src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
									alt="Your Company"
								/>
							</Link>
						</div>
					</div>
					{/* Right side of navbar */}
					<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
						<UserPopover user={props.user} />
					</div>
				</div>
			</div>
		</nav>
	);
}
