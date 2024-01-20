"use client";

import dynamic from "next/dynamic";

const DynamicAcceptedOrder = dynamic(() => import("./AcceptedOrder"));
const DynamicPendingOrder = dynamic(() => import("./PendingOrder"));
const DynamicDeniedOrder = dynamic(() => import("./DeniedOrder"));

interface OrderWrapperProps {
  status: number;
}
export default function OrderWrapper(props: OrderWrapperProps) {
  switch (props.status) {
    case 0: //pending state
      return <DynamicPendingOrder />;
    case 1: //denied state
      return <DynamicDeniedOrder />;
    case 2: //accepted state
      return <DynamicAcceptedOrder />;
  }
}
