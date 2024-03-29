import CreateDishButton from "./CreateDishButton";
import EditMenuSectionButton from "./EditMenuSection";
import MenuTable from "./MenuTable";

import getMenuDishesQuery from "app/actions/queries/getMenuDishes";
import getMenuSectionsQuery from "app/actions/queries/getMenuSections";

import { Prisma } from ".prisma/client";

type MenuTableDishSection = {
	id: string;
	name: string;
};
type MenuTableDish = {
	id: string;
	name: string;
	price: Prisma.Decimal;
	deleted: boolean;
	section: MenuTableDishSection;
};
const generateMenuTableData = (dishes: Array<MenuTableDish>) => {
	return dishes.map((dish) => ({
		id: dish.id,
		amount: Number(dish.price),
		name: dish.name,
		section: dish.section.name,
	}));
};

export default async function MenuDashboardPage() {
	const getMenuSections = getMenuSectionsQuery();
	const getMenuDishes = getMenuDishesQuery();
	const [menuSections, menuDishes] = await Promise.all([
		getMenuSections,
		getMenuDishes,
	]);
	const dishes = generateMenuTableData(menuDishes);
	return (
		<div>
			<span className="flex justify-between">
				<h1 className="text-2xl font-bold tracking-tight text-gray-900">
					Menu
				</h1>

				<div className="flex gap-3">
					<EditMenuSectionButton sections={menuSections} />
					<CreateDishButton sections={menuSections} />
				</div>
			</span>

			<MenuTable dishes={dishes} />
		</div>
	);
}
