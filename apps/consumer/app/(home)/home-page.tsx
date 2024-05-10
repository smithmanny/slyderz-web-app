import Link from "next/link";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";

import type { Chef } from "./page";
interface HomePageTypes {
	nearbyChefs: Array<Chef>;
}
const chef = {
	user: {
		id: 1,
		name: "shaki",
	},
};
const chefs = Array(10).fill(chef);
export default function HomePage(props: HomePageTypes) {
	return (
		<div className="bg-white">
			<div className="relative isolate px-2 sm:px-6 lg:px-8">
				<div
					className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
					aria-hidden="true"
				>
					<div
						className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
						style={{
							clipPath:
								"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
						}}
					/>
				</div>
				<div className="mx-auto max-w-2xl py-32 sm:py-48">
					<div className="text-center">
						<h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Unforgettable Dining with Slyderz
						</h1>
						<p className="mt-6 text-xl leading-8 text-gray-600">
							Enjoy the convenience of restaurant-quality meals cooked in your
							home.
						</p>
						<div className="mt-10 flex items-center justify-center gap-x-6">
							<Button className="text-md" size="lg" asChild>
								<Link href="/about">Learn More</Link>
							</Button>
						</div>
					</div>
				</div>
				{/* <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div> */}

				<div className="max-w-screen-2xl mx-auto">
					<h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
						Nearby Chefs
					</h3>

					<div className="grid grid-flow-col auto-cols-max gap-4 relative overflow-x-scroll">
						{chefs.map((chef, i) => (
							<Link href={`/chefs/${chef.id}`} key={chef.user.id}>
								<Card className="w-[225px] h-80">
									<div className="group relative bg-black h-80 flex rounded-[0.75rem]">
										<img
											alt="Developer"
											src="https://images.unsplash.com/photo-1603871165848-0aa92c869fa1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80"
											className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-[0.75rem]"
										/>

										<div className="relative p-2 pb-4 mt-auto">
											<p className="text-xs font-medium uppercase tracking-widest text-pink-500">
												Douglasville, GA
											</p>

											<h4 className="text-2xl font-bold text-white text-wrap capitalize">
												{chef.user.name}
											</h4>
										</div>
									</div>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
