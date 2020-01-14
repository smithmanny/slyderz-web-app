const { objectType } = require('nexus')

const CurrentSessionPayload = objectType({
  name: 'CurrentSessionPayload',
  definition(t) {
    t.string('token')
    t.field('user', { type: 'User' })
  },
})

module.exports = { CurrentSessionPayload }
