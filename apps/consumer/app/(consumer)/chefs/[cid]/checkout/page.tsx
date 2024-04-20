import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";

import Container from "app/components/Container";
import { CheckoutCartItem } from "../CartItem";
import CheckoutForm from "./CheckoutForm";

import fetchUserPaymentMethodsQuery from "app/actions/queries/fetchUserPaymentMethods";
import { getCartQuery } from "app/actions/queries/getCart";
import getUserAddressQuery from "app/actions/queries/getUserAddress";
import { cn } from "app/lib/utils";

export default async function ChefCheckoutPage({
	params,
}: {
	params: { cid: string };
}) {
	const userCart = getCartQuery();
	const userPaymentMethods = fetchUserPaymentMethodsQuery();
	const getAddress = getUserAddressQuery()
	const [cart, paymentMethods, addresses] = await Promise.all([
		userCart,
		userPaymentMethods,
		getAddress
	]);

	if (cart.items.length === 0 || !cart.eventDate || !cart.eventTime) {
		redirect("/");
	}

	return (
		<Container className={cn("mt-6")}>
			<div className="grid grid-cols-4 gap-6">
				{/* Left Section */}
				<section className="col-span-4 md:col-span-2">
					<Link href={`/chefs/${params.cid}`}>
						<ArrowLeft className="mb-8" />
					</Link>

					{cart.items.map((item, i) => (
						<CheckoutCartItem
							key={`${item.dishId}-${i}`}
							itemId={item.id}
							cartId={cart.id}
							name={item.name}
							price={item.price}
							dishId={item.dishId}
							quantity={item.quantity}
						/>
					))}
				</section>

				{/* Right Section */}
				<section className="col-span-4 md:col-span-2">
					<CheckoutForm
						chefId={params.cid}
						subtotal={cart.subtotal}
						serviceFee={cart.serviceFee}
						total={cart.total}
						cartItems={cart.items}
						address={addresses}
						paymentMethods={paymentMethods}
						eventDate={cart.eventDate}
						eventTime={cart.eventTime}
					/>
				</section>
			</div>
		</Container>
	);
}
