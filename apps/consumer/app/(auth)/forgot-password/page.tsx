import { redirect } from "next/navigation";

import Container from "app/components/Container";
import ResetPasswordForm from "./ForgotPasswordForm";

import { getSession } from "app/lib/auth";

export default async function ForgotPasswordPage() {
	const session = await getSession();

	if (session?.user) {
		redirect("/");
	}

	return (
		<Container className="max-w-lg">
			<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
				Forgot your password?
			</h4>

			<ResetPasswordForm />
		</Container>
	);
}
