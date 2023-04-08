import { AuthenticationError } from 'blitz'
import { SecurePassword } from "@blitzjs/auth/secure-password";
import { resolver } from "@blitzjs/rpc";

import db from "db"
import { Login } from "../validations"
import { Role } from "types"

export const authenticateUser = async (email: string, password: string) => {
  const user = await db.user.findFirst({ where: { email } })
  if (!user) throw new AuthenticationError()

  const result = await SecurePassword.verify(user.hashedPassword, password)

  if (result === SecurePassword.VALID_NEEDS_REHASH) {
    // Upgrade hashed password with a more secure hash
    const improvedHash = await SecurePassword.hash(password)
    await db.user.update({ where: { id: user.id }, data: { hashedPassword: improvedHash } })
  }

  const { hashedPassword, ...rest } = user
  return rest
}

export default resolver.pipe(resolver.zod(Login), async ({ email, password }, ctx) => {
  // This throws an error if credentials are invalid
  const user = await authenticateUser(email, password)
  const pendingCartItems = ctx.session?.cart?.pendingCartItems || [];
  const total = ctx.session?.cart?.total || 0;

  await ctx.session.$create({
    userId: user.id,
    role: user.role as Role,
    stripeCustomerId: user.stripeCustomerId,
    cart: {
      pendingCartItems,
      total,
    },
  })

  return user
})
