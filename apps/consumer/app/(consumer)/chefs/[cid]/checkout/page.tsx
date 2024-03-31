import { redirect } from "next/navigation";

import Container from "app/components/Container";
import { CheckoutCartItem } from "../CartItem";
import CheckoutForm from "./CheckoutForm";

import fetchUserPaymentMethodsQuery from "app/actions/queries/fetchUserPaymentMethods";
import { getCartQuery } from "app/actions/queries/getCart";
import { cn } from "app/lib/utils";

export default async function ChefCheckoutPage({
	params,
}: {
	params: { cid: string };
}) {
	// TODO: Address table deleted
	const userCart = getCartQuery();
	const userPaymentMethods = fetchUserPaymentMethodsQuery();
	const [cart, paymentMethods] = await Promise.all([
		userCart,
		userPaymentMethods,
	]);

	if (cart.items.length === 0 || !cart.eventDate || !cart.eventTime) {
		redirect("/");
	}

	return (
		<Container className={cn("mt-6")}>
			<div className="grid grid-cols-4 gap-6">
				{/* Left Section */}
				<section className="col-span-4 md:col-span-2">
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
						address=""
						paymentMethods={paymentMethods}
						eventDate={cart.eventDate}
						eventTime={cart.eventTime}
					/>
				</section>
			</div>
		</Container>
	);
}
