import Container from "app/components/Container";
import { Avatar, AvatarFallback, AvatarImage } from "app/components/ui/avatar";
import { default as UserCart } from "./Cart";
import ChefDish from "./ChefDish";

import chefProfileQuery from "app/actions/queries/chefPageQuery";
import { getCartCookie } from "app/lib/cookies";

export default async function ChefPage({
	params,
}: {
	params: { cid: string };
}) {
	const data = await chefProfileQuery(params.cid);
	const cart = await getCartCookie();

	return (
		<Container className="mt-6">
			<div className="grid grid-cols-3 gap-6 gap-x-2">
				{/* Header Section */}
				<section className="col-span-3 h-56 md:h-[360px] w-full bg-gradient-to-r from-cyan-500 to-blue-500" />

				{/* Left Section */}
				<section className="col-span-3 md:col-span-2 order-2 md:order-1">
					<div className="flex items-center">
						<Avatar className="w-20 h-20">
							<AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<h1 className="scroll-m-20 pb-2 text-1xl sm:text-2xl font-medium tracking-tight first:mt-0 ml-2">
							{data.chefName}
						</h1>
					</div>

					<span className="mt-4 grid grid-flow-col auto-cols-auto lg:w-6/12 text-muted-foreground">
						<p>Atlanta, GA</p>
						<p>Min. order $100</p>
					</span>

					<div className="py-8 isolate grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{data.dishes.map((dish, i) => (
							<ChefDish
								key={dish.id}
								name={dish.name}
								description={dish.description}
								price={Number(dish.price.toString())}
								image={dish.imageUrl}
								dishId={dish.id}
								chefId={dish.chefId}
							/>
						))}
					</div>
				</section>

				{/* Right Section */}
				<section className="col-span-3 md:col-span-1 order-1 md:order-2">
					<h2 className="scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0">
						Your Reservation
					</h2>
					<UserCart hours={data.hours} cart={cart} chefId={params.cid} />
				</section>
			</div>
		</Container>
	);
}
