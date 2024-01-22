import { redirect } from "next/navigation";

import SignupForm from "./SignupForm";
import Container from "app/components/Container";

import { getSession } from "app/lib/auth";

export default async function LoginPage() {
  const session = await getSession();

  if (session?.user) {
    redirect("/");
  }
  return (
    <Container className="max-w-lg">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign up for an account
        </h2>
      </div>

      <SignupForm />
    </Container>
  );
}
