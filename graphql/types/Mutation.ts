import { compare, hash } from 'bcryptjs'
import { schema } from 'nexus'

import { setTokens, tokenCookies } from '../../pages/api/utils/auth'

const Mutation = schema.mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        firstName: schema.stringArg({ nullable: false }),
        lastName: schema.stringArg({ nullable: false }),
        email: schema.stringArg(),
        password: schema.stringArg(),
      },
      resolve: async (parent, { firstName, lastName, email, password }, ctx) => {
        const hashedPassword = await hash(password, 10)
        const user = await ctx.db.user.create({
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
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
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
  },
})

export default Mutation

