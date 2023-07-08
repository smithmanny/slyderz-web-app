import { Column, Img, Row, Text } from "@react-email/components";
import * as React from "react";

interface EmailOrderItem {
  name: string;
  quantity: number;
  price: number;
  imageLink?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

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
            <Text style={global.text}>x{quantity}</Text>
          </Column>
          <Column>
            <Text style={global.text}>${price}</Text>
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
