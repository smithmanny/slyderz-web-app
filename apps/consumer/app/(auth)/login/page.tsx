import { redirect } from "next/navigation";

import Container from "app/components/Container";
import LoginForm from "./LoginForm";

import { getSession } from "app/lib/auth";

export default async function LoginPage() {
	const { session } = await getSession();

	if (session?.userId) {
		redirect("/");
	}
	return (
		<Container className="max-w-lg">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
			</div>

			<LoginForm />
		</Container>
	);
}
