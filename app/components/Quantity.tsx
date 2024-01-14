"use client";

import { Button } from "app/components/ui/button";

import { increaseCartItemQuantityMutation } from "app/actions/mutations/increaseCartItemQuantity";
import { decreaseCartItemQuantityMutation } from "app/actions/mutations/decreaseCartItemQuantity";

interface QuantityProps {
  count: number;
  setCount: (number) => void;
}
export function Quantity(props: QuantityProps) {
  const decreaseGuest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (props.count === 1) {
      props.setCount(1);
    } else {
      props.setCount((count) => (count -= 1));
    }
  };

  const increaseGuest = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    props.setCount((count) => (count += 1));
  };

  return (
    <span className="flex items-center gap-2">
      <Button variant="outline" size="icon" onClick={decreaseGuest}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
      <p>{props.count}</p>
      <Button variant="outline" size="icon" onClick={increaseGuest}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
    </span>
  );
}

interface CartQuantityProps {
  quantity: number;
  id: string;
}
export function CartQuantity(props: CartQuantityProps) {
  const increaseCartItemQuantity = increaseCartItemQuantityMutation.bind(null, {
    quantity: props.quantity,
    id: props.id,
  });
  const decreaseCartItemQuantity = decreaseCartItemQuantityMutation.bind(null, {
    quantity: props.quantity,
    id: props.id,
  });

  const decreaseQuantity = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await decreaseCartItemQuantity();
  };

  const increaseQuantity = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    await increaseCartItemQuantity();
  };

  return (
    <span className="flex items-center gap-1">
      <Button variant="ghost" size="icon" onClick={decreaseQuantity}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M2.25 7.5C2.25 7.22386 2.47386 7 2.75 7H12.25C12.5261 7 12.75 7.22386 12.75 7.5C12.75 7.77614 12.5261 8 12.25 8H2.75C2.47386 8 2.25 7.77614 2.25 7.5Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
      <Button variant="ghost" size="icon" onClick={increaseQuantity}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
            fill="currentColor"
            fillRule="evenodd"
            clipRule="evenodd"
          ></path>
        </svg>
      </Button>
      <p>x{props.quantity}</p>
    </span>
  );
}
