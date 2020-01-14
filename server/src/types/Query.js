const { idArg, queryType, stringArg } = require('nexus')
const { sign } = require('jsonwebtoken')

const Query = queryType({
  definition(t) {
    t.field('currentSession', {
      type: 'CurrentSessionPayload',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const user = ctx.photon.users.findOne({
          where: {
            id: ctx.request.userId
          }
        })
        return {
          token: sign({ userId: user.id }, process.env.APP_SECRET),
          user
        }
      }
    })

    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        return ctx.photon.users.findOne({
          where: {
            id: ctx.request.userId,
          },
        })
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        return ctx.photon.posts.findMany({
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
        return ctx.photon.posts.findMany({
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
        return ctx.photon.posts.findOne({
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
