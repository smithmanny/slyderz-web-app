import { schema } from 'nexus'

const Query = schema.queryType({
  definition(t) {
    t.field('currentSession', {
      type: 'CurrentSessionPayload',
      nullable: true,
      resolve: async (parent, args, ctx) => {
        const user = await ctx.db.user.findOne({
          where: {
            id: ctx.request?.user || null
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
        return ctx.db.user.findOne({
          where: {
            id: ctx.request?.user.id,
          },
        })
      },
    })
  },
})

export default Query
