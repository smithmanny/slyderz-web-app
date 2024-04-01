import Container from "app/components/Container";
import OrderWrapper from "../OrderWrapper";

import fetchOrderStatusQuery from "app/actions/queries/fetchOrderStatus";

export default async function OrdersPage({
	params,
}: {
	params: { oid: string };
}) {
	const status = await fetchOrderStatusQuery({
		confirmationNumber: params.oid,
	});
	return (
		<Container>
			<OrderWrapper status={status} />
		</Container>
	);
}
