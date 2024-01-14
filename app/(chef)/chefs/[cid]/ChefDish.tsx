"use client";

import { useState } from "react";
import Image from "next/image";
import { v4 as uuidv4 } from "uuid";

import { Button } from "app/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "app/components/ui/dialog";
import { Quantity } from "app/components/Quantity";

import { addItemToCart as addItemToCartMutation } from "app/actions/mutations/addCartItem";

type ChefDishType = {
  price: number;
  description: string;
  name: string;
  image: string | undefined;
  chefId: string;
  dishId: string;
};
export default function ChefDish(props: ChefDishType) {
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isDishDialogOpen, setIsDishDialogOpen] = useState<boolean>(false);
  const input = {
    id: uuidv4(),
    price: props.price,
    name: props.name,
    description: props.description,
    quantity: guestCount,
    dishId: props.dishId,
    chefId: props.chefId,
  };
  const addItemToCart = addItemToCartMutation.bind(null, input);
  return (
    <div className="block rounded-lg shadow-sm shadow-indigo-100">
      <Dialog open={isDishDialogOpen} onOpenChange={setIsDishDialogOpen}>
        <img
          alt="Home"
          src={
            props.image ||
            "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          }
          className="h-56 w-full rounded-md object-cover"
        />

        <div className="mt-2 p-4">
          <dl>
            <div>
              <dt className="sr-only">Name</dt>

              <dd className="font-medium">{props.name}</dd>
            </div>

            <div>
              <dt className="sr-only">Price</dt>

              <dd className="text-sm text-gray-500">${props.price}/person</dd>
            </div>
          </dl>

          <div className="mt-6 flex items-center gap-8 text-xs">
            <DialogTrigger asChild>
              <Button>Add to cart</Button>
            </DialogTrigger>
          </div>
        </div>

        <DialogContent className="sm:max-w-md p-0">
          <img
            alt="Home"
            src={
              props.image ||
              "https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            }
            className="h-56 w-full rounded-md object-cover"
          />

          <section className="px-2 pb-2">
            <DialogHeader>
              <DialogTitle>{props.name}</DialogTitle>
            </DialogHeader>

            <p className="pt-2">{props.description}</p>

            <DialogFooter className="sm:justify-start pt-4">
              <Quantity count={guestCount} setCount={setGuestCount} />
              <Button
                onClick={async () => {
                  await addItemToCart();
                  setIsDishDialogOpen(false);
                }}
              >
                Add to cart
              </Button>
            </DialogFooter>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
}
