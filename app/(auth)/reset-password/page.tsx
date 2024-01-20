import { redirect } from "next/navigation";

import Container from "app/components/Container";
import ResetPasswordForm from "./ResetPasswordForm";

import { getSession } from "app/lib/auth";

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { token: string };
}) {
  const session = await getSession();
  const token = searchParams.token;

  if (session?.user || !token) {
    redirect("/");
  }

  return (
    <Container className="max-w-lg">
      <h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
        Reset your password
      </h4>

      <ResetPasswordForm token={token} />
    </Container>
  );
}
