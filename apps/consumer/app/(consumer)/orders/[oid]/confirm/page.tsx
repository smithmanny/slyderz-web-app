import Container from "app/components/Container";
import AcceptedOrder from "../../AcceptedOrder";

import acceptOrderMutation from "app/actions/mutations/acceptOrder";

export default async function OrdersPage({
	params,
}: {
	params: { oid: string };
}) {
	acceptOrderMutation({
		confirmationNumber: params.oid,
	});

	return (
		<Container>
			<AcceptedOrder />
		</Container>
	);
}
