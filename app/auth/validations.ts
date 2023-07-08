import * as z from "zod";

const password = z.string().min(6).max(100);

export const Signup = z.object({
  email: z.string().email(),
  name: z.string(),
  password,
});

export const Login = z.object({
  email: z.string().email(),
  password: password,
});

export const ForgotPassword = z.object({
  email: z.string().email(),
});

export const ResetPassword = z
  .object({
    password: password,
    passwordConfirmation: password,
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"], // set the path of the error
  });

export const UpdatePassword = z
  .object({
    currentPassword: z.string(),
    newPassword: password,
    newPasswordConfirmation: password,
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: "Passwords don't match",
    path: ["newPasswordConfirmation"], // set the path of the error
  });
