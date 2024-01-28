import Link from "next/link";

import Container from "app/components/Container";
import { Button } from "app/components/ui/button";

import verifyEmailMutation from "app/actions/mutations/emailVerification";

export default async function EmailVerificationMutation({
	params,
}: {
	params: { token: string };
}) {
	await verifyEmailMutation(params.token);

	return (
		<Container className="max-w-lg">
			<h4 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-6">
				Your email has been verified!
			</h4>

			<Link href="/" replace>
				<Button className="mt-4">Go home</Button>
			</Link>
		</Container>
	);
}
