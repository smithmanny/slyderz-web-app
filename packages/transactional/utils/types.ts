export interface ActivateEmailProps {
	activationUrl: string
}

type EmailOrderItemsType = {
  name: string;
  price: string;
  quantity: number;
};
export interface EmailBodyProps {
  orderLocation: string;
  orderDate: string;
  orderTime: string;
  orderTotal: string;
  orderItems: Array<EmailOrderItemsType>;
}

export interface ChefOrderRequestEmailProps extends EmailBodyProps {
  orderApproveUrl: string;
  orderDenyUrl: string;
}

export interface ForgotPasswordEmailProps {
	resetPasswordUrl: string;
}
