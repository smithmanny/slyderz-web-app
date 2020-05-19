import { schema } from 'nexus'

const MessagePayload = schema.objectType({
  name: 'MessagePayload',
  definition(t) {
    t.string('message')
  },
})

export default MessagePayload
