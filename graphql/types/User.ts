import { schema } from 'nexus'

schema.enumType({
  name: 'Role',
  members: ['USER', 'ADMIN']
})

const User = schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.string('avatarUrl')
    t.string('firstName')
    t.string('lastName')
    t.string('email')
    t.string('address1')
    t.string('address2')
    t.string('city')
    t.string('state')
    t.field('role', {
      type: 'Role'
    })
    t.int('postalCode')
    t.string('resetToken')
    t.string('resetTokenExpiry')
  },
})

export default User