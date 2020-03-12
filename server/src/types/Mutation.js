const { compare, hash } = require('bcryptjs')
const { idArg, mutationType, stringArg } = require('nexus')

const { setTokens, tokenCookies } = require('../utils/auth')

const Mutation = mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        firstName: stringArg({ nullable: false }),
        lastName: stringArg({ nullable: false }),
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { firstName, lastName, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.prisma.user.create({
          data: {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
          },
        })
        const tokens = setTokens(user)
        const cookies = tokenCookies(tokens)

        ctx.response.cookie(...cookies.access)
        ctx.response.cookie(...cookies.refresh)
        return {
          user,
        }
      },
    })

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: stringArg(),
        password: stringArg(),
      },
      resolve: async (parent, { email, password }, context) => {
        const user = await context.prisma.user.findOne({
          where: {
            email: email.toLowerCase(),
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }

        const tokens = setTokens(user)
        const cookies = tokenCookies(tokens)

        context.response.cookie(...cookies.access)
        context.response.cookie(...cookies.refresh)
        return {
          user,
        }
      },
    })

    t.field('signout', {
      type: 'MessagePayload',
      resolve: (parent, args, ctx) => {
        ctx.response.clearCookie('access')
        ctx.response.clearCookie('refresh')
        ctx.response.redirect('/')
      }
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
      },
      resolve: (parent, { title, content }, ctx) => {
        return ctx.prisma.posts.create({
          data: {
            title,
            content,
            published: false,
            author: { connect: { id: ctx.request.user.id } },
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.posts.delete({
          where: {
            id,
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.prisma.posts.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})

module.exports = {
  Mutation,
}
