import { redirect } from "next/navigation";

import Container from "app/components/Container";
import CheckoutForm from "./CheckoutForm";
import { CheckoutCartItem } from "../CartItem";

import fetchUserAddress from "app/actions/queries/fetchUserAddress";
import fetchUserPaymentMethodsQuery from "app/actions/queries/fetchUserPaymentMethods";
import { getCartCookie } from "app/lib/cookies";
import { cn } from "app/lib/utils";

export default async function ChefCheckoutPage({
  params,
}: {
  params: { cid: string };
}) {
  const userAddresses = fetchUserAddress();
  const userCart = getCartCookie();
  const userPaymentMethods = fetchUserPaymentMethodsQuery();
  const [addresses, cart, paymentMethods] = await Promise.all([
    userAddresses,
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
              cartId={item.id}
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
            cartTotal={cart.total}
            addresses={addresses}
            paymentMethods={paymentMethods}
          />
        </section>
      </div>
    </Container>
  );
}
