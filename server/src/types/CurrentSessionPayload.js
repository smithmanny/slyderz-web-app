const { objectType } = require('nexus')

const CurrentSessionPayload = objectType({
  name: 'CurrentSessionPayload',
  definition(t) {
    t.field('user', { type: 'User', nullable: true })
  },
})

module.exports = { CurrentSessionPayload }
