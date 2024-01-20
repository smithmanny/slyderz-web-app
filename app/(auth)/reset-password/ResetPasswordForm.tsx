"use client";

import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "app/components/ui/form";
import { Input } from "app/components/ui/input";
import { Button } from "app/components/ui/button";

import { useSlyderzForm } from "app/hooks/useSlyderzForm";
import handlePasswordResetMutation from "app/actions/mutations/handlePasswordReset";

interface ResetPasswordFormProps {
  token: string;
}
export const ResetPasswordFormSchema = z
  .object({
    password: z.string(),
    passwordConfirmation: z.string(),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  });
export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const form = useSlyderzForm(ResetPasswordFormSchema, {
    password: "",
    passwordConfirmation: "",
  });
  const password = form.getFieldState("password");
  const passwordConfirmation = form.getFieldState("passwordConfirmation");

  const handlePasswordReset = handlePasswordResetMutation.bind(
    null,
    props.token,
  );
  return (
    <Form {...form}>
      <form action={handlePasswordReset} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Enter your new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm password</FormLabel>
              <FormControl>
                <Input placeholder="Confirm your new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={!password.isDirty || !passwordConfirmation.isDirty}
        >
          Change password
        </Button>
      </form>
    </Form>
  );
}
