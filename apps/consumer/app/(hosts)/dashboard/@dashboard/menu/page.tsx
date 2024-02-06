import AddMenuSectionButton from "./AddMenuSection";

import getMenuSectionsQuery from "app/actions/queries/getMenuSections";

export default async function MenuDashboardPage() {
	const menuSections = await getMenuSectionsQuery();
	return (
		<div>
			<span className="flex justify-between">
				<h1 className="text-2xl font-bold tracking-tight text-gray-900">
					Menu
				</h1>
				<AddMenuSectionButton />
			</span>

			{menuSections.map((section) => (
				<h1 key={section.id}>{section.name}</h1>
			))}
		</div>
	);
}
