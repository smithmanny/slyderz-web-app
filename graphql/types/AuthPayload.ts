import { schema } from 'nexus'

const AuthPayload = schema.objectType({
  name: 'AuthPayload',
  definition(t) {
    t.field('user', { type: 'User' })
  },
})

export default AuthPayload
