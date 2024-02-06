import { Column, Img, Row, Text } from "jsx-email";
import * as React from "react";

interface EmailOrderItem {
	name: string;
	quantity: number;
	price: number;
	imageLink?: string;
}

export const EmailOrderItem = ({
	name = "Surf & Turf",
	quantity = 1,
	price = 25,
	imageLink = "https://react-email-demo-ijnnx5hul-resend.vercel.app/static/nike-product.png",
}: EmailOrderItem) => {
	return (
		<Row style={row}>
			<Column>
				<Img
					src={imageLink}
					alt="Dish image"
					style={{ float: "left" }}
					width="260px"
				/>
			</Column>
			<Column style={{ verticalAlign: "top", paddingLeft: "12px" }}>
				<Text style={{ ...paragraph, fontWeight: "500" }}>{name}</Text>

				<Row>
					<Column>
						<Text>x{quantity}</Text>
					</Column>
					<Column>
						<Text>${price}</Text>
					</Column>
				</Row>
			</Column>
		</Row>
	);
};

export default EmailOrderItem;

const row = {
	marginBottom: 10,
};

const paragraph = {
	margin: "0",
	lineHeight: "2",
};
