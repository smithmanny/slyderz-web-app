import Container from "app/components/Container";
import OrderWrapper from "../OrderWrapper";

import fetchOrderStatusQuery from "app/actions/queries/fetchOrderStatus";

export default async function OrdersPage({
  params,
  searchParams,
}: {
  params: { oid: string };
  searchParams: { status: number };
}) {
  await fetchOrderStatusQuery({
    confirmationNumber: params.oid,
    status: Number(searchParams.status),
  });
  return (
    <Container>
      <OrderWrapper status={Number(searchParams.status)} />
    </Container>
  );
}
