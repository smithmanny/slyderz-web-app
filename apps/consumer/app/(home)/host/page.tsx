import Image from "next/image";

import Container from "app/components/Container";
import OurVisionImage from "public/our-vision-min.jpeg";

import { getSession } from "app/lib/auth";
import BecomeHostButton from "./BecomeHostButton";

export default async function HostPage() {
	const { session } = await getSession();

	return (
		<Container className="bg-white">
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
				<div className="mx-auto max-w-2xl py-20">
					<div className="text-center">
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							Become a host with Slyderz
						</h1>
						<p className="mt-6 text-xl leading-8 text-gray-600">
							Your menu. Your rules
						</p>
					</div>
				</div>

				<div className="max-w-screen-2xl mx-auto text-center">
					<section className="grid grid-cols-1 md:grid-cols-3 gap-2">
						<div>
							<h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
								Showcase your cooking skills
							</h3>

							<p>
								Chefs have a platform to showcase their skills and create unique
								menus. Connect with new clients and grow your business with
								access to our customer base.
							</p>
						</div>
						<div>
							<h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
								Flexibility. No Contracts.
							</h3>

							<p>
								Work on your own terms and enjoy the freedom to manage your
								business and grow your culinary career without any contracts.
							</p>
						</div>
						<div>
							<h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
								Instant payments
							</h3>

							<p>
								With Slyderz, chefs receive instant payments after completing a
								booking. Say goodbye to waiting for payouts!
							</p>
						</div>
					</section>

					<section className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-28">
						<div className="text-left">
							<h3 className="scroll-m-20 pb-2 text-xl font-semibold tracking-tight">
								How it works
							</h3>

							<p>
								Slyderz provides a platform that allows chefs, caterers, and
								anyone with experience to showcase their skills and connect with
								new customers. Our platform allows our host to:
							</p>
							<ul className="py-4 list-disc pl-4">
								<li>Manage their availability</li>
								<li>Create and update their menus</li>
								<li>Track their bookings</li>
								<li>Communicate with your guest</li>
								<li>Receive instant payments</li>
							</ul>
							<p>
								Plus, our platform makes it easy for chefs to receive payment
								and manage their finances, so they can focus on what they do
								best - <strong>cooking delicious food.</strong>
							</p>
							<br />
							<p>
								As a personal chef for Slyderz, you&apos;ll be tasked with
								cooking your favorite meals in homes around you. The typical
								time our chefs are at a client&apos;s home is typically 60-75
								minutes.
							</p>
							<br />
							<p>
								Before the customer event, Slyderz will pay-out 20% of the money
								upfront to the chef to get the necessary ingredients and
								groceries, the remainder will be paid out upon completion of the
								event. You&apos;ll bring the cookware (pots, pans, knives, etc)
								while the client provides the appliances and serve-ware.
							</p>
							<br />
							<p>
								You&apos;ll also be responsible for creating your own menu and
								setting your own prices. You keep 85% of the check and 100% of
								tips. The 15% we collect allows us to fund our advertisement
								budget, customer support, payment processing, etc.
							</p>
						</div>
						<div className="h-[400px] w-full order-first md:order-last relative">
							<Image
								alt="Become a host"
								fill
								src={OurVisionImage}
								objectFit="cover"
							/>
						</div>
					</section>
				</div>

				<div className="mt-4">
					<h3 className="pb-2 scroll-m-20 text-lg font-semibold tracking-tight">
						All sounds good to you?
					</h3>
					<BecomeHostButton userId={session?.userId} />
				</div>
			</div>
		</Container>
	);
}
