import Image from "next/image";

import Container from "app/components/Container";
import MissionImage from "public/our-mission-min.jpeg";
import AboutImage from "public/our-story-min.jpeg";

export default async function AboutPage() {
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
				<div className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-28">
					<div>
						<h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
							We&apos;re changing the way people eat.
						</h1>
						<p className="mt-6 text-xl leading-8 text-gray-600">
							Slyderz is an on-demand chef service that connects consumers with
							professional chefs to enjoy high-quality cuisine in the comfort of
							their homes. The platform offers a convenient booking and payment
							system, allowing customers to browse local chefs, view their menus
							and pricing, and book the perfect chef for their needs.
						</p>
					</div>

					<div className="h-[400px] w-full order-first md:order-last relative">
						<Image
							alt="About Slyderz"
							fill
							src={MissionImage}
							objectFit="cover"
						/>
					</div>
				</div>

				<div className="max-w-screen-2xl mx-auto text-center">
					<section className="grid grid-cols-1 md:grid-cols-2 gap-20 mt-28">
						<div className="text-left">
							<h3 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight">
								Our story
							</h3>

							<p>
								In a world that&apos;s always in a rush, we realized something
								was missing - the joy of savoring home-cooked meals and
								experiencing the culinary magic firsthand. That&apos;s why we
								founded Slyderz, a platform connecting food enthusiasts with
								personal chefs, transforming dining experiences one home at a
								time.
							</p>
							<br />
							<p>
								Slyderz was born out of our love for food and the desire to
								bring gourmet cooking right to your kitchen. Founded in 2023 by
								a team of passionate foodies and tech enthusiasts, our mission
								is to redefine the way people dine at home.
							</p>
							<br />
							<p>
								We saw an untapped potential in the food industry - talented
								chefs looking for opportunities to showcase their culinary
								skills beyond restaurants and people yearning for a unique,
								intimate dining experience. This inspired us to create a
								platform that not only bridges this gap but also allows
								individuals to enjoy restaurant-quality meals from the comfort
								of their own homes.
							</p>
						</div>
						<div className="h-[400px] w-full order-first md:order-last relative">
							<Image
								alt="About Slyderz"
								fill
								src={AboutImage}
								objectFit="cover"
							/>
						</div>
					</section>

					<section className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-2 py-20">
						<div>
							<h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
								Enjoy gourmet meals in the comfort of your own home
							</h3>

							<p>
								Say goodbye to crowded restaurants and enjoy a personalized
								dining experience that&apos;s tailored to your preferences and
								needs.
							</p>
						</div>
						<div>
							<h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
								Discover new chefs and cuisines
							</h3>

							<p>
								Slyderz offers a variety of local chefs with diverse culinary
								backgrounds and specialties.
							</p>
						</div>
						<div>
							<h3 className="scroll-m-20 text-lg font-semibold tracking-tight">
								Convenient and hassle-free booking
							</h3>

							<p>
								With our convenient booking and payment system, you can relax
								and enjoy your meal without any hassle. Whether you&apos;re
								planning a dinner party or a romantic evening, Slyderz takes
								care of everything so you can sit back and savor the moment.
							</p>
						</div>
					</section>

					<section>
						<div className="text-left">
							<h3 className="scroll-m-20 pb-2 text-2xl font-semibold tracking-tight">
								Our mission
							</h3>

							<div className="mt-2 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
								<div className="block rounded-xl p-8 shadow-xl transition hover:shadow-[#a0352f]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-10 w-10 text-[#a0352f]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>Connect</title>
										<path d="M12 14l9-5-9-5-9 5 9 5z" />
										<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										/>
									</svg>

									<h2 className="mt-4 text-xl font-bold">
										Connect consumers with chefs
									</h2>

									<p className="mt-1 text-sm">
										Our platform allows our host and customers to communicate
										with each other and book and event with ease.
									</p>
								</div>

								<div className="block rounded-xl p-8 shadow-xl transition hover:shadow-[#a0352f]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-10 w-10 text-[#a0352f]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>Cuisine</title>
										<path d="M12 14l9-5-9-5-9 5 9 5z" />
										<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										/>
									</svg>

									<h2 className="mt-4 text-xl font-bold">
										Make high-quality cuisine accessible to everyone
									</h2>

									<p className="mt-1 text-sm">
										While giving the power to the chefs and keeping fees to a
										minimum, we aim to have an option affordable for everyone
										needs.
									</p>
								</div>

								<div className="block rounded-xl p-8 shadow-xl transition hover:shadow-[#a0352f]">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="h-10 w-10 text-[#a0352f]"
										fill="none"
										viewBox="0 0 24 24"
										stroke="currentColor"
									>
										<title>Bring back the joy</title>
										<path d="M12 14l9-5-9-5-9 5 9 5z" />
										<path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
										/>
									</svg>

									<h2 className="mt-4 text-xl font-bold">
										Bring back the joy of gathering around the table
									</h2>

									<p className="mt-1 text-sm">
										Slyderz is about building community and sharing a home meal
										cooked with with your loved ones.
									</p>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</Container>
	);
}
