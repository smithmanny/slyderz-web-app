"use client";

import { useQuery } from "@tanstack/react-query";

import {
	Activity,
	ArrowUpRight,
	Currency,
	DollarSign,
	PackageCheck,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { Button } from "app/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "app/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "app/components/ui/table";

import getChefOrdersQuery from "app/actions/queries/getChefOrders";
import { formatNumberToCurrency, readableDate } from "app/lib/utils";

export default function Dashboard() {
	const { data: completedOrders } = useQuery({
		queryKey: ["chef-dashboard-orders"],
		queryFn: () => getChefOrdersQuery(),
	});

	return (
		<main className="flex flex-1 flex-col gap-4 mt-8 md:gap-8">
			<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{completedOrders?.revenue}</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Monthly Revenue
						</CardTitle>
						<Currency className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{completedOrders?.revenue}</div>
						<p className="text-xs text-muted-foreground">
							+20.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Open Orders</CardTitle>
						<Activity className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">23</div>
						<p className="text-xs text-muted-foreground">
							+180.1% from last month
						</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">
							Completed Orders
						</CardTitle>
						<PackageCheck className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{completedOrders?.count}</div>
						<p className="text-xs text-muted-foreground">
							+19% from last month
						</p>
					</CardContent>
				</Card>
			</div>
			<div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
				<Card className="xl:col-span-2">
					<CardHeader className="flex flex-row items-center">
						<div className="grid gap-2">
							<CardTitle>Past orders</CardTitle>
							<CardDescription>
								Recent orders that have been completed.
							</CardDescription>
						</div>
						<Button asChild size="sm" className="ml-auto gap-1">
							<Link href="#">
								View All
								<ArrowUpRight className="h-4 w-4" />
							</Link>
						</Button>
					</CardHeader>
					<CardContent>
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Order #</TableHead>
									<TableHead className="text-right">Amount</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{completedOrders?.orders.map((order) => (
									<TableRow key={order.id}>
										<TableCell>
											<div className="font-medium">
												{order.confirmationNumber.toUpperCase()}
											</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												{readableDate(new Date(order.eventDate))}
											</div>
										</TableCell>
										<TableCell className="text-right">
											{formatNumberToCurrency(Number(order.total))}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Top Dishes</CardTitle>
					</CardHeader>
					<CardContent className="grid gap-8">
						Coming soon
						{/* <div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/01.png" alt="Avatar" />
								<AvatarFallback>OM</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="text-sm font-medium leading-none">
									Olivia Martin
								</p>
								<p className="text-sm text-muted-foreground">
									olivia.martin@email.com
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/02.png" alt="Avatar" />
								<AvatarFallback>JL</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="text-sm font-medium leading-none">
									Jackson Lee
								</p>
								<p className="text-sm text-muted-foreground">
									jackson.lee@email.com
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/03.png" alt="Avatar" />
								<AvatarFallback>IN</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="text-sm font-medium leading-none">
									Isabella Nguyen
								</p>
								<p className="text-sm text-muted-foreground">
									isabella.nguyen@email.com
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/04.png" alt="Avatar" />
								<AvatarFallback>WK</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="text-sm font-medium leading-none">
									William Kim
								</p>
								<p className="text-sm text-muted-foreground">
									will@email.com
								</p>
							</div>
						</div>
						<div className="flex items-center gap-4">
							<Avatar className="hidden h-9 w-9 sm:flex">
								<AvatarImage src="/avatars/05.png" alt="Avatar" />
								<AvatarFallback>SD</AvatarFallback>
							</Avatar>
							<div className="grid gap-1">
								<p className="text-sm font-medium leading-none">
									Sofia Davis
								</p>
								<p className="text-sm text-muted-foreground">
									sofia.davis@email.com
								</p>
							</div>
						</div> */}
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
