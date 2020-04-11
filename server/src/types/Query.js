const { idArg, queryType, stringArg } = require('nexus')

const Query = queryType({
  definition(t) {
    t.field('currentSession', {
      type: 'CurrentSessionPayload',
      nullable: true,
      resolve: async (parent, args, ctx) => {
        const user = await ctx.prisma.user.findOne({
          where: {
            id: ctx.request.user ? ctx.request.user.id : null
          }
        })
        return {
          user
        }
      }
    })

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        return ctx.prisma.user.findOne({
          where: {
            id: ctx.request.user.id,
          },
        })
      },
    })
  },
})

module.exports = {
  Query,
}
