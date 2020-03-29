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

    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.prisma.posts.findMany({
          where: { published: true },
        })
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (parent, { searchString }, ctx) => {
        return ctx.prisma.posts.findMany({
          where: {
            OR: [
              {
                title: {
                  contains: searchString,
                },
              },
              {
                content: {
                  contains: searchString,
                },
              },
            ],
          },
        })
      },
    })

    t.field('post', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.posts.findOne({
          where: {
            id,
          },
        })
      },
    })
  },
})

module.exports = {
  Query,
}
