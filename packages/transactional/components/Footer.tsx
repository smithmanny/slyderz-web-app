import { Link, Section, Text, Hr } from "jsx-email";

function EmailFooter() {
	return (
		<Section className="flex">
			<Hr />
			<Text style={footerText}>
				©2023 Slyderz, LLC, <br />
				500 Howard Street, San Francisco, CA 94105, USA <br />
				<br />
				All rights reserved.
			</Text>
		</Section>
	);
}

export default EmailFooter;

const footerText = {
	fontSize: "12px",
	color: "#b7b7b7",
	lineHeight: "15px",
	textAlign: "left" as const,
	marginBottom: "50px",
};

const footerLink = {
	color: "#b7b7b7",
	textDecoration: "underline",
};
