import { schema } from 'nexus'

schema.enumType({
  name: 'Role',
  members: ['USER', 'ADMIN']
})

const User = schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.avatarUrl()
    t.model.firstName()
    t.model.lastName()
    t.model.email()
    t.model.address1()
    t.model.address2()
    t.model.city()
    t.model.state()
    t.model.role()
    t.model.postalCode()
    t.model.resetToken()
    t.model.resetTokenExpiry()
  },
})

export default User