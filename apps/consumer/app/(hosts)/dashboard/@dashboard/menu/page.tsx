import {
	HydrationBoundary,
	QueryClient,
	dehydrate,
} from "@tanstack/react-query";

import CreateDishButton from "./CreateDishButton";
import EditMenuSectionButton from "./EditMenuSection";
import MenuTable from "./MenuTable";

import getMenuDishesQuery from "app/actions/queries/getMenuDishes";
import getMenuSectionsQuery from "app/actions/queries/getMenuSections";

export default async function MenuDashboardPage() {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery({
		queryKey: ["dashboard-menu-sections"],
		queryFn: getMenuSectionsQuery,
	});

	await queryClient.prefetchQuery({
		queryKey: ["dashboard-menu-dishes"],
		queryFn: getMenuDishesQuery,
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div>
				<span className="flex justify-between">
					<h1 className="text-2xl font-bold tracking-tight text-gray-900">
						Menu
					</h1>

					<div className="flex gap-3">
						<EditMenuSectionButton />
						<CreateDishButton />
					</div>
				</span>

				<MenuTable />
			</div>
		</HydrationBoundary>
	);
}
