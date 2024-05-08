import Link from "next/link";

import UserPopover from "app/components/UserPopover";
import { cn } from "app/lib/utils";
import type { User } from "lucia";

interface AppBarTypes {
	className?: string;
	user: User | null;
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
								<h6 className="text-2xl font-bold">Slyderz</h6>
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
