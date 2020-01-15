const { objectType } = require('nexus')

const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.field('user', { type: 'User' })
  },
})

module.exports = { AuthPayload }
