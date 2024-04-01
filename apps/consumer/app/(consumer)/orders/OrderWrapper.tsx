"use client";

import dynamic from "next/dynamic";

import { orders } from "drizzle/schema/order";

const DynamicAcceptedOrder = dynamic(() => import("./AcceptedOrder"));
const DynamicPendingOrder = dynamic(() => import("./PendingOrder"));
const DynamicDeniedOrder = dynamic(() => import("./DeniedOrder"));

type StatusType = (typeof orders.orderStatus.enumValues)[number];

interface OrderWrapperProps {
	status: StatusType;
}
export default function OrderWrapper(props: OrderWrapperProps) {
	switch (props.status) {
		case "pending": //pending state
			return <DynamicPendingOrder />;
		case "declined": //denied state
			return <DynamicDeniedOrder />;
		case "accepted": //accepted state
			return <DynamicAcceptedOrder />;
	}
}
