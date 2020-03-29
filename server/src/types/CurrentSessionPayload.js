const { objectType } = require('nexus')

const CurrentSessionPayload = objectType({
  name: 'CurrentSessionPayload',
  nullable: true,
  definition(t) {
    t.field('user', { type: 'User', nullable: true })
  },
})

module.exports = { CurrentSessionPayload }
