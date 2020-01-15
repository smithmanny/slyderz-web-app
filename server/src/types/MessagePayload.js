const { objectType } = require('nexus')

const MessagePayload = objectType({
  name: 'MessagePayload',
  definition(t) {
    t.string('message')
  },
})

module.exports = { MessagePayload }
