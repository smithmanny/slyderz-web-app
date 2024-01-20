"use client";

import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";

import { useSlyderzForm } from "app/hooks/useSlyderzForm";
import sendPasswordResetLinkMutation from "app/actions/mutations/sendPasswordResetLink";

export default function ForgotPasswordForm() {
  const formSchema = z.object({
    email: z.string().email(),
  });
  const form = useSlyderzForm(formSchema, {
    email: "",
  });
  const email = form.getFieldState("email");
  return (
    <Form {...form}>
      <form action={sendPasswordResetLinkMutation} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@test.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={!email.isDirty}>
          Reset your password
        </Button>
      </form>
    </Form>
  );
}
