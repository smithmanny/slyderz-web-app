import { Column, Heading, Hr, Row, Section, Text } from "jsx-email";
import * as React from "react";

import SlyderzEmailLayout from "./";
import EmailButton from "../components/EmailButton";
import EmailOrderItem from "../components/OrderItem";

import { ChefOrderRequest } from "utils/types";

export const EmailChefOrderRequest = ({
	orderLocation = "4511 Glider Circle, Douglasville, Ga, 30135",
	orderDate = "Oct 30, 2023",
	orderTime = "9:36 PM",
	orderTotal = "100.36",
	orderItems = [{ name: "Surf & Turf", price: 25, quantity: 2 }],
	orderApproveUrl,
	orderDenyUrl,
}: ChefOrderRequest) => (
	<SlyderzEmailLayout
		style={container}
		previewText="🥳 You received a new order!"
	>
		<Hr style={global.hr} />
		<Section style={message}>
			<Heading style={global.heading}>You received a new order</Heading>
			<Text style={global.text}>
				A new order request has been received.{" "}
				<strong>Please respond within 24 hours to confirm the order.</strong>
			</Text>
		</Section>
		<Hr style={global.hr} />
		<Section style={global.defaultPadding}>
			<Text style={adressTitle}>Event Location:</Text>
			<Text style={{ ...global.text, fontSize: 14 }}>{orderLocation}</Text>
		</Section>
		<Hr style={global.hr} />
		<Section style={{ ...paddingX, paddingTop: "40px", paddingBottom: "40px" }}>
			{orderItems.map((item, index) => (
				<EmailOrderItem
					key={`${item.name}-${index}`}
					name={item.name}
					quantity={item.quantity}
					price={item.price}
				/>
			))}
		</Section>
		<Hr style={global.hr} />
		<Section style={global.defaultPadding}>
			<Row className="columns-3 mb-10">
				<Column align="center">
					<Text style={global.paragraphWithBold}>Event Date</Text>
					<Text style={track.number}>{orderDate}</Text>
				</Column>
				<Column align="center">
					<Text style={global.paragraphWithBold}>Event Time</Text>
					<Text style={track.number}>{orderTime}</Text>
				</Column>
				<Column align="center">
					<Text style={global.paragraphWithBold}>Event Total</Text>
					<Text style={track.number}>$ {orderTotal}</Text>
				</Column>
			</Row>
			<Row>
				<Column align="center">
					<EmailButton link={orderApproveUrl}>Accept Order</EmailButton>
				</Column>
				<Column align="center">
					<EmailButton style={denyOrder} link={orderDenyUrl}>
						Deny Order
					</EmailButton>
				</Column>
			</Row>
		</Section>
	</SlyderzEmailLayout>
);

export default EmailChefOrderRequest;

const denyOrder = {
	backgroundColor: "#F64A4A",
};

const paddingX = {
	paddingLeft: "40px",
	paddingRight: "40px",
};

const paddingY = {
	paddingTop: "22px",
	paddingBottom: "22px",
};

const paragraph = {
	margin: "0",
	lineHeight: "2",
};

const global = {
	paddingX,
	paddingY,
	defaultPadding: {
		...paddingX,
		...paddingY,
	},
	paragraphWithBold: { ...paragraph, fontWeight: "bold" },
	heading: {
		fontSize: "32px",
		lineHeight: "1.3",
		fontWeight: "700",
		textAlign: "center",
		letterSpacing: "-1px",
	} as React.CSSProperties,
	text: {
		...paragraph,
		color: "#747474",
		fontWeight: "500",
	},
	button: {
		border: "1px solid #929292",
		fontSize: "16px",
		textDecoration: "none",
		padding: "10px 0px",
		width: "220px",
		display: "block",
		textAlign: "center",
		fontWeight: 500,
		color: "#000",
	} as React.CSSProperties,
	hr: {
		borderColor: "#E5E5E5",
		margin: "0",
	},
};

const container = {
	margin: "10px auto",
	width: "600px",
	border: "1px solid #E5E5E5",
};

const track = {
	container: {
		padding: "22px 40px",
		backgroundColor: "#F7F7F7",
	},
	number: {
		margin: "12px 0 0 0",
		fontWeight: 500,
		lineHeight: "1.4",
		color: "#6F6F6F",
	},
};

const message = {
	padding: "40px 74px",
	textAlign: "center",
} as React.CSSProperties;

const adressTitle = {
	...paragraph,
	fontSize: "15px",
	fontWeight: "bold",
};
