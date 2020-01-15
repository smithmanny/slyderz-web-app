const { objectType } = require('nexus')

const CurrentSessionPayload = objectType({
  name: 'CurrentSessionPayload',
  definition(t) {
    t.field('user', { type: 'User' })
  },
})

module.exports = { CurrentSessionPayload }
