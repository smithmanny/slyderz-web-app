export type Role = "ADMIN" | "USER" | "CHEF";
export const CHEF_SERVICE_FEE = 0.03;
export const CONSUMER_SERVICE_FEE = 0.10;
export interface CartItem {
  chefId: number;
  id: string;
  description: string;
  name: string;
  price: number;
  dishId: number;
  quantity: number;
}
export interface EmailBodyType {
  cartItems: Array<CartItem>;
  confirmationNumber: string;
  chefEmail: string;
  acceptOrderUrl: string;
  denyOrderUrl: string;
  email: string;
  eventDate: string;
  eventTime: string;
  orderTotal: Number;
}
export interface EmailBodyResponseType {
  cartItems: Array<CartItem>;
  chefEmail: string;
  orderNumber: string;
  email: string;
  eventDate: string;
  eventTime: string;
  orderTotal: Number;
}
interface Cart {
  eventDate?: Date | null;
  eventTime?: string;
  pendingCartItems: Array<CartItem> | Array<any>;
  total: number;
}

// Email section
export interface SESParamsType {
  subject: string;
  to: string;
  htmlContent: string;
  textContent: string;
}

type TranactionalEmailTypes =
  | "ACTIVATION"
  | "NEW-ORDER-CHEF"
  | "NEW-ORDER-CONSUMER"
  | "ORDER-APPROVED"
  | "ORDER-DENIED"
  | "ORDER-CONFIRMED"
  | "RESET-PASSWORD"
  | "FORGOT-PASSWORD";
interface TransactionalEmailInterface {
  activation: TranactionalEmailTypes;
  newOrderConsumer: TranactionalEmailTypes;
  newOrderChef: TranactionalEmailTypes;
  denyOrder: TranactionalEmailTypes;
  confirmOrder: TranactionalEmailTypes;
  resetPassword: TranactionalEmailTypes;
  forgotPassword: TranactionalEmailTypes;
}
export const TRANSACTIONAL_EMAILS: TransactionalEmailInterface = {
  activation: "ACTIVATION",
  newOrderConsumer: "NEW-ORDER-CONSUMER",
  newOrderChef: "NEW-ORDER-CHEF",
  denyOrder: "ORDER-DENIED",
  confirmOrder: "ORDER-CONFIRMED",
  resetPassword: "RESET-PASSWORD",
  forgotPassword: "FORGOT-PASSWORD",
};

export interface ActivationEmailInputType {
  activationUrl: string;
}
type OrderItemsType = {
  title: string;
  quantity: string;
};
export interface ConsumerNewOrderEmailInputType {
  order: {
    orderNumber: string;
    date: string;
    time: string;
    location: string;
    subtotal: number;
    serviceFee: number;
    total: number;
    items: Array<OrderItemsType>;
  };
}
export interface ConsumerOrderApprovedEmailInputType
  extends ConsumerNewOrderEmailInputType {}
export interface ChefNewOrderEmailInputType {
  order: {
    subtotal: number;
  };
}

type SendSesObjectType =
  | ChefNewOrderEmailInputType
  | ConsumerOrderApprovedEmailInputType
  | ConsumerNewOrderEmailInputType
  | OrderItemsType
  | ActivationEmailInputType
  | object;
export interface SendSesEmailType {
  to: string;
  type: string;
  variables?: SendSesObjectType;
}
