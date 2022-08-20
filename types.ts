import { SessionContext, SimpleRolesIsAuthorized } from "@blitzjs/auth";
import { User } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER"

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
  acceptOrderUrl: URL
  denyOrderUrl: URL
  eventDate: string
  eventTime: string
  orderTotal: Number
}
interface Cart {
  pendingCartItems: Array<CartItem> | [],
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
