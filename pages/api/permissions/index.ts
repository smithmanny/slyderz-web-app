import { rule, shield } from 'nexus-plugin-shield'
import { getUserId } from '../utils'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    const userId = getUserId(ctx.token)
    return Boolean(userId)
  }
)

const permissions = shield({
  rules: {
    Query: {
      me: isAuthenticated,
    },
    Mutation: {},
  }
})

export { permissions }

