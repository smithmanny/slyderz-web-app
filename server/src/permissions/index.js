const { rule, shield } = require('graphql-shield')
const { getUserId } = require('../utils/utils')

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context)
    return Boolean(userId)
  }),
  // isPostOwner: rule()(async (parent, { id }, context) => {
  //   const userId = getUserId(context)
  //   const author = await context.prisma
  //     .post({
  //       id,
  //     })
  //     .author()
  //   return userId === author.id
  // }),
}

const permissions = shield({
  Query: {
    me: rules.isAuthenticatedUser,
  },
  Mutation: {},
})

module.exports = {
  permissions,
}