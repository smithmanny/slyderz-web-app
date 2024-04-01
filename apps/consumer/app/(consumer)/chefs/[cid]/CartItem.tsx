"use client";

import Image from "next/image";

import { CartQuantity } from "app/components/Quantity";
import { Button } from "app/components/ui/button";

import { deleteCartItemMutation } from "app/actions/mutations/deleteCartItem";
import { localImageLoader } from "app/lib/utils";

interface CartItemProps {
	itemId: string;
	dishId: string;
	cartId: string;
	name: string;
	price: number;
	quantity: number;
}
export function CartItem(props: CartItemProps) {
	return (
		<div className="grid grid-cols-6 gap-2 w-full items-center border-b-2 pb-2 mb-2">
			<p className="col-span-3 text-sm leading-7">{props.name}</p>
			<div className="col-span-2">
				<CartQuantity
					quantity={props.quantity}
					id={props.itemId}
					cartId={props.cartId}
				/>
			</div>
			<div className="col-span-1 flex flex-row items-center">
				<p className="col-span-1 text-sm leading-7">
					${props.price * props.quantity}
				</p>
				{/* Delete icon */}
				<Button
					variant="ghost"
					size="icon"
					onClick={async (e) => {
						e.preventDefault();
						e.stopPropagation();

						await deleteCartItemMutation({ id: props.itemId });
					}}
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Delete cart item</title>
						<path
							d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						/>
					</svg>
				</Button>
			</div>
		</div>
	);
}

export function CheckoutCartItem(props: CartItemProps) {
	return (
		<div className="grid grid-cols-6 gap-2 w-full items-center border-b-2 pb-2 mb-2">
			<div className="relative h-[96px] col-span-2 lg:col-span-1">
				<Image
					alt=""
					src="https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
					fill
					loader={localImageLoader}
				/>
			</div>
			<div className="col-span-3 lg:col-span-4">
				<p className="text-sm font-medium leading-7">{props.name}</p>
				<span className="flex gap-2">
					<p className="text-sm leading-7">${props.price}</p>
					<p className="text-sm leading-7">x{props.quantity}</p>
				</span>
			</div>
			<div className="col-span-1 flex flex-row items-center">
				{/* Delete icon */}
				<Button
					variant="ghost"
					size="icon"
					onClick={async (e) => {
						e.preventDefault();
						e.stopPropagation();

						await deleteCartItemMutation({ id: props.itemId });
					}}
				>
					<svg
						width="15"
						height="15"
						viewBox="0 0 15 15"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<title>Decrease cart item</title>
						<path
							d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
							fill="currentColor"
							fillRule="evenodd"
							clipRule="evenodd"
						/>
					</svg>
				</Button>
			</div>
		</div>
	);
}
