import { SessionContext, SimpleRolesIsAuthorized } from "@blitzjs/auth";
import { User } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER" | "CHEF"

export interface CartItem {
  chefId: number,
  id: string,
  description: string,
  name: string,
  price: number,
  dishId: number,
  quantity: number,
}
export interface EmailBodyType {
  cartItems: Array<CartItem>
  confirmationNumber: string
  chefEmail: string
  acceptOrderUrl: string
  denyOrderUrl: string
  email: string
  eventDate: string
  eventTime: string
  orderTotal: Number
}
export interface EmailBodyResponseType {
  cartItems: Array<CartItem>
  chefEmail: string
  orderNumber: string
  email: string
  eventDate: string
  eventTime: string
  orderTotal: Number
}
interface Cart {
  pendingCartItems: Array<CartItem> | Array<any>,
  total: number,
}

declare module "@blitzjs/auth" {
  export interface Ctx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      stripeCustomerId: string,
      userId: User["id"]
      role: Role,
      cart: Cart,
    }
  }
}

export interface SESParamsType {
  subject: string
  to: string
  htmlContent: string
  textContent: string
}

type TranactionalEmailTypes = 'ACTIVATION' | 'NEW-ORDER-CHEF' | 'NEW-ORDER-CONSUMER' | 'ORDER-APPROVED' | 'ORDER-DENIED' | 'ORDER-CONFIRMED' | 'RESET-PASSWORD' | 'FORGOT-PASSWORD'
interface TransactionalEmailInterface {
  activation: TranactionalEmailTypes
  newOrderConsumer: TranactionalEmailTypes
  newOrderChef: TranactionalEmailTypes
  denyOrder: TranactionalEmailTypes
  confirmOrder: TranactionalEmailTypes
  resetPassword: TranactionalEmailTypes
  forgotPassword: TranactionalEmailTypes
}
export const TRANSACTIONAL_EMAILS: TransactionalEmailInterface = {
  activation: "ACTIVATION",
  newOrderConsumer: 'NEW-ORDER-CONSUMER',
  newOrderChef: 'NEW-ORDER-CHEF',
  denyOrder: 'ORDER-DENIED',
  confirmOrder: 'ORDER-CONFIRMED',
  resetPassword: 'RESET-PASSWORD',
  forgotPassword: 'FORGOT-PASSWORD'
}

export interface ActivationEmailInputType {
  activationUrl: string
}
type OrderItemsType = {
  title: string
  quantity: string
}
export interface ConsumerNewOrderEmailInputType {
  order: {
    orderNumber: string
    date: string
    time: string
    location: string
    subtotal: number
    serviceFee: number
    total: number
    items: Array<OrderItemsType>
  }
}
export interface ConsumerOrderApprovedEmailInputType extends ConsumerNewOrderEmailInputType {}
export interface ChefNewOrderEmailInputType {
  order: {
    subtotal: number
  }
}

type SendSesObjectType = ChefNewOrderEmailInputType | ConsumerOrderApprovedEmailInputType | ConsumerNewOrderEmailInputType | OrderItemsType | ActivationEmailInputType | object
export interface SendSesEmailType {
  to: string
  type: string
  variables?: SendSesObjectType
}

export const CHEF_SERVICE_FEE = .03
export const CONSUMER_SERVICE_FEE = .10