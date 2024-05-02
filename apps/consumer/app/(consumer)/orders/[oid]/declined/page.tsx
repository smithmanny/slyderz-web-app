import Container from "app/components/Container";
import DeniedOrder from "../../DeniedOrder";

import denyOrderMutation from "app/actions/mutations/denyOrder";

export default async function OrdersPage({
	params,
}: {
	params: { oid: string };
}) {
	denyOrderMutation({
		confirmationNumber: params.oid,
	});

	return (
		<Container>
			<DeniedOrder />
		</Container>
	);
}
