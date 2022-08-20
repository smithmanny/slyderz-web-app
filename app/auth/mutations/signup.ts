import { SecurePassword } from "@blitzjs/auth";
import { resolver } from "@blitzjs/rpc";
import db from "db"
import { Signup } from "app/auth/validations"
import { Role } from "types"

const stripe = require("stripe")(process.env.BLITZ_PUBLIC_STRIPE_SECRET_KEY);

export default resolver.pipe(resolver.zod(Signup), async ({ email, firstName, lastName, password }, ctx) => {
  const hashedPassword = await SecurePassword.hash(password)

  const stripeCustomer = await stripe.customers.create({
    email,
    name: `${firstName} ${lastName}`,
  })

  const user = await db.user.create({
    data: {
      email: email.toLowerCase(),
      firstName,
      lastName,
      hashedPassword,
      role: "USER",
      stripeCustomerId: stripeCustomer.id,
    },
    select: { id: true, firstName: true, lastName: true, email: true, role: true },
  })

  // Merge pending carts from logged out session
  const pendingCartItems = ctx.session?.cart?.pendingCartItems || [];
  const total = ctx.session?.cart?.total || 0;

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    cart: {
      pendingCartItems,
      total,
    },
    stripeCustomerId: stripeCustomer.id
  })
  return user
})
