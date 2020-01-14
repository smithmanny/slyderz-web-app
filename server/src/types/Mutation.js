const { compare, hash } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const { idArg, mutationType, stringArg } = require('nexus')

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
        const user = await ctx.photon.users.create({
          data: {
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: hashedPassword,
          },
        })
        const token = sign({ userId: user.id }, process.env.APP_SECRET)
        // Set the jwt user token as a cookie on the response
        ctx.response.cookie('_slyderz', token, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year cookie
        });
        return {
          token,
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
        const user = await context.photon.users.findOne({
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
        return {
          token: sign({ userId: user.id }, process.env.APP_SECRET),
          user,
        }
      },
    })

    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
      },
      resolve: (parent, { title, content }, ctx) => {
        return ctx.photon.posts.create({
          data: {
            title,
            content,
            published: false,
            author: { connect: { id: ctx.request.userId } },
          },
        })
      },
    })

    t.field('deletePost', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.posts.delete({
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
        return ctx.photon.posts.update({
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
