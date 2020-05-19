import { rule } from 'nexus-plugin-shield'
import { getUserId } from '../utils'

const isAuthenticated = rule({ cache: 'contextual' })(
  async (parent, args, ctx, info) => {
    const userId = getUserId(ctx.token)
    return Boolean(userId)
  }
)

const rules = {
  Query: {
    me: isAuthenticated,
  },
  Mutation: {},
}

export { rules }

