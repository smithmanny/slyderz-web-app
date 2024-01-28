import { Text, Section } from "jsx-email";
import * as React from "react";

export const EmailHeader = (props: any) => {
	return (
		<Section className="text-center my-[40px] mx-auto p-[20px]">
			<Text style={title}>{props.children}</Text>
		</Section>
	);
};

export default EmailHeader;

const title = {
	fontSize: "32px",
	fontFamily:
		"'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
	fontWeight: "bold",
	color: "#404040",
	lineHeight: "26px",
};
