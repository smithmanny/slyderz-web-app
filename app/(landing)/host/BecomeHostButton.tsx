"use client";

import { toast } from "sonner";

import { Button } from "app/components/ui/button";

import createChefMutation from "app/actions/mutations/createChef";

interface BecomeHostProps {
  userId?: string;
}
export default function BecomeHostButton(props: BecomeHostProps) {
  return (
    <Button
      onClick={async () => {
        if (!props.userId) {
          return toast.warning("Please log in first");
        }

        await createChefMutation(props.userId);
      }}
    >
      Become a host
    </Button>
  );
}
