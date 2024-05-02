import Container from "app/components/Container";
import PendingOrder from "../PendingOrder";

import fetchPendingOrder from "app/actions/queries/fetchPendingOrder";

export default async function OrdersPage({
	params,
}: {
	params: { oid: string };
}) {
	await fetchPendingOrder({
		confirmationNumber: params.oid,
	});

	return (
		<Container>
			<PendingOrder />
		</Container>
	);
}
