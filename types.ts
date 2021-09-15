import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER"

export interface CartItem {
  id: string,
  description: string,
  name: string,
  price: number,
  quantity: number,
}
interface Cart {
  pendingCartItems: Array<CartItem> | Array<[]>,
  total: number,
}

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role,
      cart: Cart,
    }
  }
}
