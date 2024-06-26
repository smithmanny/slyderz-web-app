import { Column, Img, Row, Text } from "jsx-email";

import { formatNumberToCurrency } from "../utils/helpers"

interface EmailOrderItem {
	name: string;
	quantity: number;
	price: string;
	imageLink?: string;
}

export const EmailOrderItem = ({
	name,
	quantity,
	price,
	imageLink = "https://react-email-demo-ijnnx5hul-resend.vercel.app/static/nike-product.png",
}: EmailOrderItem) => {
	const usdPrice = formatNumberToCurrency(Number(price))

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
						<Text>{usdPrice}</Text>
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
